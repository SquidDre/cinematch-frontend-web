import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock data to populate the UI until your API is hooked up
const mockResults = [
  {
    id: 1,
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014',
    duration: '2h 49m',
    rating: 'PG-13',
    genres: ['Sci-fi', 'Adventure'],
    match: 97,
    services: ['Netflix', 'Hulu'],
    image: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg' // Standard TMDB poster path
  },
  {
    id: 2,
    title: 'Marty Supreme',
    director: 'Christopher Nolan',
    year: '2014',
    duration: '2h 49m',
    rating: 'PG-13',
    genres: ['Sci-fi', 'Adventure'],
    match: 97,
    services: ['Netflix', 'Hulu'],
    image: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg'
  },
  {
    id: 3,
    title: 'World',
    director: 'Christopher Nolan',
    year: '2014',
    duration: '2h 49m',
    rating: 'PG-13',
    genres: ['Sci-fi', 'Adventure'],
    match: 97,
    services: ['Netflix', 'Hulu'],
    image: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg'
  }
];

const Search: React.FC = () => {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All services');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filters = [
        'All services', 'Netflix', 'Hulu', 'Apple TV', '|',
        'Sci-fi', 'Drama', 'Action', 'Horror', 'Comedy', 'Anime', 'Fantasy', '|',
        'Highest Match', 'Recently Added'
    ];

    const handleAddWatchlist = async (movieId: number) => {
        // Implement your logic to add the movie to the user's watchlist
        console.log(`Adding movie with ID ${movieId} to watchlist`);
        setIsLoading(true);
        setError('');

        try {
            const savedUser = localStorage.getItem('user');
            if (!savedUser) {
                setError('User not authenticated. Please log in again.');
                return;
            }
            
            const user = JSON.parse(savedUser);

            const payload = {
                userId: user._id,
                movieId: String(movieId),
                status: 'unwatched',
                addedAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:8080/api/watchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add to watchlist');
            }

            // Optionally, you can update the UI or show a success message here
            console.log('Movie added to watchlist successfully');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#E85D22] selection:text-white">
        
        {/* Navigation Bar */}
        
        <Navbar />

        {/* Main Content */}
        <main className="mx-auto px-32 pt-16 pb-24">
            
            {/* Hero Section */}
            <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-serif tracking-tight leading-none mb-2">
                Find your next
            </h1>
            <h1 className="text-6xl md:text-7xl font-serif italic text-[#E85D22] tracking-tight leading-none mb-6">
                film.
            </h1>
            <p className="text-gray-400 text-lg">
                Search across everything available on your services.
            </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                {/* Search Icon */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-white/20 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#E85D22] transition-colors"
            />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
            {filters.map((filter, index) => {
                if (filter === '|') {
                return <div key={index} className="w-px h-6 bg-white/20 mx-1"></div>;
                }
                
                const isActive = activeFilter === filter;
                return (
                <button
                    key={index}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
                    ${isActive 
                        ? 'border-[#E85D22] text-white bg-[#E85D22]/10' 
                        : 'border-white/20 text-gray-400 hover:border-gray-400 hover:text-white'
                    }`}
                >
                    {filter}
                </button>
                );
            })}
            </div>

            {/* Results List */}
            <div className="flex flex-col gap-4">
            {mockResults.map((movie) => (
                <div key={movie.id} className="flex flex-col md:flex-row bg-[#151515] rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
                
                {/* Movie Poster */}
                <div className="w-full md:w-32 h-48 md:h-auto flex-shrink-0">
                    <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                    />
                </div>

                {/* Movie Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">{movie.title}</h2>
                    <p className="text-gray-400 text-sm mb-4">
                        {movie.director} · {movie.year} · {movie.duration} · {movie.rating}
                    </p>
                    <div className="flex gap-2">
                        {movie.genres.map((genre, idx) => (
                        <span key={idx} className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                            {genre}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="p-6 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-white/5 md:w-64">
                    <div className="text-left md:text-right w-full mb-4 md:mb-0">
                    <div className="text-4xl font-serif text-[#E85D22] mb-1">{movie.match}%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {movie.services.join(' · ')}
                    </div>
                    </div>
                    
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors w-full md:w-auto justify-center" onClick={() => handleAddWatchlist(movie.id)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add to watchlist
                    </button>
                </div>

                </div>
            ))}
            </div>

        </main>
        </div>
    );
};

export default Search;