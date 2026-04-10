import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

// DUMMY DATA (swap for real API data later)
const MOVIE = {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014',
    runtime: '169 mins',
    rating: 'PG-13',
    genres: ['Sci-fi', 'Adventure'],
    backdrop: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth's future is threatened by a dying planet, a former NASA pilot leads a mission into deep space trading years with his daughter for the chance to save our species.",
    streamingOn: ['Netflix', 'Hulu', 'Prime Video'],
    matchScore: 97,
    matchReason: 'Based on your 5-star rating of Ex Machina and high marks for Arrival. You consistently rate cerebral, emotionally-driven sci-fi at the top. Interstellar matches this pattern with a 97% matching score.',
    imdbRating: 8.7,
    cast: [
        { name: 'Matthew McConaughey', initials: 'MM' },
        { name: 'Anne Hathaway', initials: 'AH' },
        { name: 'Jessica Chastain', initials: 'JC' },
    ],
};

const MovieDetail: React.FC = () => {
    const navigate = useNavigate();
    const [addedToWatchlist, setAddedToWatchlist] = React.useState(false);
    const [showRating, setShowRating] = React.useState(false);
    const [userRating, setUserRating] = React.useState(0);
    const [hoveredStar, setHoveredStar] = React.useState<number | null>(null);

    const ratingLabels: Record<number, string> = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Great',
        5: 'Perfect',
    };

    return (
        <div className="min-h-screen bg-[#2b2b2b] text-white font-sans">

            {/* ── Backdrop ── */}
            <div className="relative w-full h-[420px]">
                <img
                    src={MOVIE.backdrop}
                    alt={MOVIE.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b2b] via-[#2b2b2b]/40 to-transparent" />

                {/* ← back */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-8 text-white text-sm hover:text-gray-300 transition-colors"
                >
                    ← back
                </button>

                {/* Genre pills */}
                <div className="absolute bottom-16 left-8 flex gap-2">
                    {MOVIE.genres.map((genre, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
              {genre}
            </span>
                    ))}
                </div>
            </div>

            {/* ── Title + Meta + Buttons ── */}
            <div className="px-8 pb-6">
                <h1 className="text-6xl font-serif text-white mb-2 leading-tight">{MOVIE.title}</h1>
                <p className="text-[#888] text-sm mb-5 tracking-tight">
                    {MOVIE.director} · {MOVIE.year} · {MOVIE.runtime.replace(' mins', 'm')} · {MOVIE.rating}
                </p>

                {/* Buttons + Streaming */}
                <div className="flex flex-wrap items-end gap-6 mb-10">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setAddedToWatchlist(!addedToWatchlist)}
                            className={`px-5 py-2.5 rounded-[10px] text-sm font-bold transition-colors cursor-pointer ${
                                addedToWatchlist ? 'bg-white text-black' : 'bg-[#E85D22] hover:bg-[#d0521e] text-white'
                            }`}
                        >
                            {addedToWatchlist ? '✓ Added to watchlist' : '+ Add to watchlist'}
                        </button>
                        {userRating > 0 ? (
                            <button
                                onClick={() => setShowRating(!showRating)}
                                className="px-5 py-2.5 rounded-[10px] text-sm font-bold border-2 border-[#E85D22] text-[#E85D22] transition-colors cursor-pointer"
                            >
                                ★ Rated {userRating}/5
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowRating(!showRating)}
                                className="px-5 py-2.5 rounded-[10px] text-sm font-bold border-2 border-white/20 hover:border-white/40 text-white transition-colors cursor-pointer"
                            >
                                ★ Rate this movie
                            </button>
                        )}
                    </div>

                    {/* Available On */}
                    <div>
                        <p className="text-[#888] text-[10px] font-semibold tracking-widest uppercase mb-2">Available On</p>
                        <div className="flex items-center gap-5">
                            {/* Netflix */}
                            <span className="text-[#E50914] font-black text-lg tracking-tight">NETFLIX</span>
                            {/* Hulu */}
                            <span className="text-[#1CE783] font-black text-lg">hulu</span>
                            {/* Prime Video */}
                            <span className="text-[#00A8E0] font-bold text-base">prime <span className="text-white">video</span></span>
                        </div>
                    </div>
                </div>

                {/* ── Rating Bar ── */}
                {showRating && (
                    <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-xl px-6 py-4 mb-8 w-full max-w-2xl">
                        <span className="text-gray-400 text-sm font-semibold">Your rating</span>
                        <div className="flex gap-2 ml-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(null)}
                                    onClick={() => { setUserRating(star); setShowRating(false); }}
                                    className="cursor-pointer transition-transform hover:scale-110"
                                >
                                    <StarIcon
                                        className={`w-8 h-8 transition-colors ${
                                            star <= (hoveredStar ?? userRating) ? 'text-[#E85D22]' : 'text-gray-600'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {(hoveredStar || userRating) ? (
                            <span className="text-[#E85D22] text-sm font-semibold">
                {ratingLabels[hoveredStar ?? userRating]}
              </span>
                        ) : null}
                    </div>
                )}

                {/* Lower Section: Two Columns */}
                <div className="flex gap-10">

                    {/* Left Column */}
                    <div className="flex-1">
                        <div className="flex gap-6 mb-6">
                            {/* Poster */}
                            <img
                                src={MOVIE.poster}
                                alt={MOVIE.title}
                                className="w-[165px] h-[230px] object-cover rounded-lg flex-shrink-0"
                            />

                            {/* Description + Info boxes */}
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    {MOVIE.description}
                                </p>

                                {/* Info Boxes */}
                                <div className="flex gap-3">
                                    <div className="flex-1 border border-[#444] rounded-lg px-4 py-3">
                                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-1">Director</p>
                                        <p className="text-white text-sm font-semibold">{MOVIE.director}</p>
                                    </div>
                                    <div className="flex-1 border border-[#444] rounded-lg px-4 py-3">
                                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-1">Runtime</p>
                                        <p className="text-white text-sm font-semibold">{MOVIE.runtime}</p>
                                    </div>
                                    <div className="flex-1 border border-[#444] rounded-lg px-4 py-3">
                                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-1">Year</p>
                                        <p className="text-white text-sm font-semibold">{MOVIE.year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Match Score Box */}
                        <div className="border border-[#E85D22]/40 rounded-lg px-5 py-4">
                            <p className="text-[#E85D22] text-xs font-bold tracking-widest uppercase mb-2">
                                {MOVIE.matchScore}% Match For You
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Based on your 5-star rating of <strong className="text-white">Ex Machina</strong> and high marks for <strong className="text-white">Arrival</strong>. You consistently rate cerebral, emotionally-driven sci-fi at the top. <strong className="text-white">Interstellar</strong> matches this pattern with a <strong className="text-white">{MOVIE.matchScore}%</strong> matching score.
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-64 flex-shrink-0">
                        {/* IMDB Rating */}
                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-3">IMDB Rating</p>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-white text-5xl font-bold">{MOVIE.imdbRating}</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon key={star} className="w-6 h-6 text-[#E85D22]" />
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#444] mb-6" />

                        {/* Director */}
                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-4">Director</p>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#444] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">CN</span>
                            </div>
                            <span className="text-white text-sm font-semibold">{MOVIE.director}</span>
                        </div>

                        {/* Cast */}
                        <p className="text-[#888] text-[10px] font-bold tracking-widest uppercase mb-4">Cast</p>
                        <div className="flex flex-col gap-4">
                            {MOVIE.cast.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#444] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs font-bold">{member.initials}</span>
                                    </div>
                                    <span className="text-white text-sm font-semibold">{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
