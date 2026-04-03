import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

// --- DUMMY DATA ---
const MOVIE_QUEUE = [
  {
    id: '1',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014',
    duration: '2H 49M',
    genres: ['Sci-Fi', 'Adventure'],
    poster: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg', 
  },
  {
    id: '2',
    title: 'Everything Everywhere All at Once',
    director: 'Daniel Kwan, Daniel Scheinert',
    year: '2022',
    duration: '2H 19M',
    genres: ['Action', 'Comedy'],
    poster: 'https://image.tmdb.org/t/p/w1280/u68AjlvlutfEIcpmbYpKcdi09ut.jpg',
  },
  {
    id: '3',
    title: 'Spider-Man: Into the Spider-Verse',
    director: 'Bob Persichetti, Peter Ramsey',
    year: '2018',
    duration: '1H 57M',
    genres: ['Animation', 'Action'],
    poster: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  }
];

const RateMoviesScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number | 'skipped'>>({});

  const currentMovie = MOVIE_QUEUE[currentIndex];
  const totalMovies = MOVIE_QUEUE.length; 
  const isFinished = currentIndex >= totalMovies;

  // --- HANDLERS ---
  const handleNextMovie = (action: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      action();
      setCurrentIndex((prev) => prev + 1);
      setIsFading(false);
      setHoveredStar(null);
    }, 300);
  };

  const rateMovie = (rating: number) => {
    handleNextMovie(() => {
      setRatings((prev) => ({ ...prev, [currentMovie.id]: rating }));
    });
  };

  const skipMovie = () => {
    handleNextMovie(() => {
      setRatings((prev) => ({ ...prev, [currentMovie.id]: 'skipped' }));
    });
  };

  const handleFinish = () => {
    console.log("Final Ratings Data:", ratings);
    navigate('/home');
  };

  // --- RENDER FINISHED STATE ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white font-sans p-8">
        <h1 className="text-5xl font-serif italic text-[#E85D22] mb-6">All set!</h1>
        <p className="text-gray-400 text-lg mb-10">We've locked in your tastes.</p>
        <button 
          onClick={handleFinish}
          className="bg-[#E85D22] hover:bg-[#d04e1b] text-white px-10 py-4 rounded-full font-bold text-xl transition-colors flex items-center gap-2"
        >
          See my picks <span>&rarr;</span>
        </button>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="flex flex-col min-h-screen font-sans text-white selection:bg-[#E85D22] selection:text-white">
      <div className="flex flex-col lg:flex-row flex-grow">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/2 bg-[#141414] p-8 md:p-16 flex flex-col justify-between lg:border-r lg:border-[#333] min-h-[50vh] lg:min-h-0">
          
          {/* Header (Left Side) */}
          <div className="flex justify-between w-full mb-24">
            <div className="text-xl font-bold tracking-[0.2em] ml-4 text-gray-500">
              CINEMATCH
            </div>
            {/* Step indicator shows on mobile here, hidden on desktop */}
            <div className="text-sm text-gray-500 font-medium tracking-wide">
              Step 2 of 3
            </div>
          </div>

          {/* Typography & Instructions */}
          <div className="flex flex-col justify-center ml-4">
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif tracking-tight leading-[0.9] text-white mb-2">
              Tell us your
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-[110px] italic font-serif tracking-tight leading-[0.9] text-[#E85D22] mb-6">
              favorites
            </h1>
            <p className="text-gray-400 text-lg max-w-sm mb-12">
              Rate each card and save it. Skip anything you haven't seen.
            </p>

            {/* Progress Bar */}
            <div className="mb-12 max-w-md">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                <span>Your ratings</span>
                <span><strong className="text-[#E85D22]">{currentIndex}</strong> of {totalMovies} rated</span>
              </div>
              <div className="w-full bg-black border border-[#333] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#E85D22] h-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentIndex / totalMovies) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Movie Meta & Controls */}
          <div className={`transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">
              Movie {currentIndex + 1} of {totalMovies}
            </p>
            
            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentMovie.genres.map((genre, idx) => (
                <span key={idx} className="px-3 py-1 border border-[#444] bg-black text-gray-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
              {currentMovie.title}
            </h2>
            <p className="text-gray-500 mb-8">
              Directed by {currentMovie.director} • {currentMovie.year} • {currentMovie.duration}
            </p>

            {/* Interaction Row */}
            <div className="flex items-center gap-6 md:gap-8">
              {/* Star Rating */}
              <div className="flex gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => rateMovie(star)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    {(hoveredStar !== null && star <= hoveredStar) ? (
                      <StarSolid className="w-9 h-9 md:w-10 md:h-10 text-[#E85D22]" />
                    ) : (
                      <StarOutline className="w-9 h-9 md:w-10 md:h-10 text-gray-500 hover:text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="w-px h-8 bg-[#444]"></div>

              {/* Skip Button */}
              <button 
                onClick={skipMovie}
                className="text-gray-400 hover:text-white font-bold tracking-wide transition-colors whitespace-nowrap"
              >
                Skip movie
              </button>
            </div>
          </div>
        </div>

        {/* --- Right Column: Pure Black Background --- */}
        <div className="w-full lg:w-1/2 bg-black p-8 md:p-16 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0">
          
          {/* Step indicator shows on desktop here to balance the logo */}

          <div className={`relative w-full max-w-md xl:max-w-lg aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${isFading ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
            <img 
              src={currentMovie.poster} 
              alt={currentMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RateMoviesScreen;