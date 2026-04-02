import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Reuse marquee
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const MarqueeContent = () => (
        <div className = "flex items-center space-x-6 px-3">
            <span className = "font-serif text-3xl font-bold tracking-tight text-black">CineMatch</span>
            <span className = "text-white/70 text-sm">●</span>
            <span className = "text-lg text-white">
                <strong className = "text-black">10,000+</strong> movies catalogued
            </span>
            <span className = "text-white/70 text-sm">●</span>
            <span className = "font-bold text-lg text-black">
                Netflix · Hulu · Apple TV+
                <span className = "font-normal text-white">· 5 more </span>
            </span>
            <span className = "text-white/70 text-sm">●</span>
            <span className = "font-serif italic text-3xl tracking-tight text-black">Your next favorite</span>
            <span className = "text-white/70 text-sm">●</span>
            <span className = "text-lg text-white">
                <strong className = "text-black">10,000+</strong> movies catalogued
            </span>
            <span className = "text-white/70 text-sm">●</span>
            <span className = "font-bold text-lg text-black">
                Netflix · Hulu · Apple TV+
                <span className = "font-normal text-white">· 5 more </span>
            </span>
        </div>
    );

    return (
        <div className = "flex flex-col min-h-screen font-sans">
            <style>
                {`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% {transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: scroll 20s linear infinite;
                    }
                `}
            </style>

            {/* Main Content for Login Splitting Page */}
            <div className = "flex flex-col lg:flex-row flex-grow">
                {/* Left side */}
                <div className = "w-full lg:w-1/2 bg-[#F4F1EA] p-8 md:p-16 md:pb-24 flex flex-col relative min-h-[50vh] lg:min-h-0">
                    <div className = "text-xl font-bold tracking-[0.2em] text-gray-500 mb-36">
                        CINEMATCH
                    </div>

                    <div className = "mb-12">
                        <h1 className = "text-7xl md:text-8xl lg:text-[110px] font-serif tracking-tight leading-[0.9] text-black">
                            Welcome
                        </h1>
                        <h1 className = "text-7xl md:text-8xl lg:text-[110px] font-serif italic text-[#E85D22] tracking-tight leading-[0.9]">
                            back.
                        </h1>
                    </div>

                    <p className = "text-gray-500 text-lg md:text-xl max-w-md leading-relaxed mb-8 lg:mb-0">
                        Start exploring new movies
                    </p>

                    <p className = "text-gray-500 text-lg mt-auto text-center w-full flex justify-center items-center gap-2">
                        Don't have an account?{' '}
                        <a href = "/create" className = "text-[#E85D22] font-bold hover:underline">Sign up</a>
                    </p>
                </div>

                {/* Right Side */}
                <div className = "w-full lg:w-1/2 bg-black p-8 md:p-16 flex flex-col min-h-[50vh] lg:min-h-0 md:pt-36">
                    <div className = "max-w-xl mx-auto w-full lg:mx-0 lg:ml-12">
                        <p className = "text-[#E85D22] text-lg font-bold tracking-widest uppercase mb-4">
                            Your Details
                        </p>

                        <h2 className = "text-5xl md:text-6xl font-serif tracking-tight text-white mb-12 leading-tight">
                            Good to see<br />you again.
                        </h2>

                        {/* Email */}
                        <p className = "text-gray-400 text-sm mb-2 font-bold tracking-widest uppercase">
                            Email
                        </p>
                        <input
                            type = "email"
                            placeholder = "eg. johndoe@gmail.com"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            className = "w-full mb-6 px-5 py-3.5 rounded-full bg-[#1E1E1E] border-2 border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E85D22] focus:border-transparent transition-colors duration-200"
                        />

                        {/* Password */}
                        <p className = "text-gray-400 text-sm mb-2 font-bold tracking-widest uppercase">
                            Password
                        </p>
                        <div className = "relative mb-1">
                            <input
                                type = {showPassword ? 'text' : 'password'}
                                placeholder = "Enter your password"
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}
                                className = "w-full px-5 py-3.5 rounded-full bg-[#1E1E1E] border-2 border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E85D22] focus:border-transparent transition-colors duration-200 pr-12"

                            />
                            <button
                                type = "button"
                                onClick = {() => setShowPassword(!showPassword)}
                                className = "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                aria-label = {showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (<EyeSlashIcon className = "w-5 h-5"/>) : (<EyeIcon className = "w-5 h-5" />)}
                            </button>
                        </div>
                        <p className = "text-gray-500 text-sm mb-[73px]">Must be at least 8 characters</p>

                        {/* Sign in button */}
                        <button
                            onClick = {() => navigate('/')}
                            className = "w-full py-4 rounded-full bg-[#E85D22] text-white font-bold text-lg hover:bg-[#d0521e] transition-colors duration-200"
                        >
                            Sign in →
                        </button>
                    </div>
                </div>
            </div>

            {/* Infinite scrolling marquee */}
            <div className = "w-full bg-[#E85D22] overflow-hidden py-4 border-t border-black/10">
                <div className = "flex w-max animate-marquee">
                    <MarqueeContent />
                    <MarqueeContent />
                </div>
            </div>
        </div>
    );
};

export default Login;