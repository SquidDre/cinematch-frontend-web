import React from 'react';
import { useNavigate } from 'react-router-dom';
import envelopeImg from '../../assets/envelope.png';

interface VerifyProps {
    email?: string;
}

const Verify: React.FC<VerifyProps> = ({ email = 'johndoe@gmail.com' }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-black font-sans">

            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 border-b border-[#222]">
                <p className="text-xl font-bold tracking-[0.2em] text-gray-500">
                    CINEMATCH
                </p>
                <button
                    onClick={() => navigate('/create')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                    ← Back to sign up
                </button>
            </header>

            {/* Centered Content */}
            <div className="flex-grow flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-xl text-center">

                    {/* Envelope Image */}
                    <div className="flex justify-center mb-8">
                        <img src={envelopeImg} alt="Envelope" className="w-40 h-auto" />
                    </div>

                    {/* ALMOST THERE label */}
                    <p className="text-[#E85D22] text-xs font-bold tracking-widest uppercase mb-6">
                        Almost There
                    </p>

                    {/* Heading */}
                    <h1 className="text-7xl md:text-8xl font-serif tracking-tight text-white leading-[0.9] mb-2">
                        Check your
                    </h1>
                    <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight text-[#E85D22] leading-[0.9] mb-10">
                        inbox.
                    </h1>

                    {/* Body text */}
                    <p className="text-gray-400 text-lg mb-1">
                        we sent a verification link to
                    </p>
                    <p className="text-[#E85D22] font-semibold text-lg mb-3">
                        {email}
                    </p>
                    <p className="text-gray-400 text-lg mb-10">
                        Click the link to activate your account.
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-800 mb-8" />

                    {/* Resend */}
                    <p className="text-gray-400 text-sm">
                        Didn't get it?{' '}
                        <button className="text-[#E85D22] font-semibold hover:underline">
                            Resend email
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Verify;
