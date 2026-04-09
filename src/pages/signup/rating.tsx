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
  const [isCardShrunk, setIsCardShrunk] = useState(false);

  
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
      setIsCardShrunk(false); //reset the large poster for next
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
              Step <span className = "font-bold">3</span> of 3
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
            <div className="max-w-md">
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

          {/* Conditional */}
          <div className={`ml-0 lg:ml-4 transition-opacity duration-500 ease-in-out`}>
            
            {isFinished ? (
              // The Finale State (Fades in)
              <div className="animate-fade-in-up">
                <h2 className="text-4xl font-serif italic text-[#E85D22] mb-4">All set!</h2>
                <p className="text-gray-400 mb-8">We've locked in your tastes.</p>
                <button 
                  onClick={handleFinish}
                  className="bg-[#E85D22] hover:bg-[#d04e1b] text-white px-8 py-3.5 rounded-full font-bold transition-colors inline-flex items-center gap-2"
                >
                  See my picks <span>&rarr;</span>
                </button>
              </div>
            ) : (
              // The Normal State (Movie Meta)
              <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentMovie?.genres.map((genre, idx) => (
                    <span key={idx} className="px-3 py-1  border-1 border-[#E85D22] bg-[#2A1200] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                  {currentMovie?.title}
                </h2>
                <p className="text-gray-500">
                  Directed by {currentMovie?.director} • {currentMovie?.year}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* --- Right Column: Pure Black Background --- */}
        <div className="w-full lg:w-1/2 bg-black p-8 md:p-16 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0">
          

          {/* The Interactive Card */}
          {!isFinished && currentMovie && (
            <div 
              onClick={() => !isCardShrunk && setIsCardShrunk(true)}
              className={`relative flex flex-col items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCardShrunk 
                  ? 'w-full max-w-md bg-white rounded-[2rem] p-6 cursor-default' 
                  : 'w-full max-w-md xl:max-w-lg bg-transparent rounded-2xl p-0 cursor-pointer hover:scale-[1.02]'
              } ${isFading ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
            >
              
              {/* The Poster Image */}
              <div className={`w-full transition-all duration-700 overflow-hidden ${isCardShrunk ? 'aspect-[2/3] rounded-xl' : 'aspect-[2/3] rounded-2xl shadow-2xl'}`}>
                <img 
                  src={currentMovie.poster} 
                  alt={currentMovie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* The Rating UI (Only fades in when card is shrunk) */}
              <div className={`flex flex-col items-center w-full transition-all duration-500 ${isCardShrunk ? 'opacity-100 mt-6 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                <h3 className="text-black font-serif text-2xl mb-1">{currentMovie.title}</h3>
                <p className="text-gray-400 text-xs mb-4">{currentMovie.director} • {currentMovie.year}</p>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => rateMovie(star)}
                      className="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                    >
                      {(hoveredStar !== null && star <= hoveredStar) ? (
                        <StarSolid className="w-8 h-8 text-[#E85D22]" />
                      ) : (
                        <StarSolid className="w-8 h-8 text-gray-200 hover:text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Rating Label */}
                <p className="text-[#E85D22] text-sm font-semibold mb-4 h-5">
                  {hoveredStar === 1 && 'Poor'}
                  {hoveredStar === 2 && 'Fair'}
                  {hoveredStar === 3 && 'Good'}
                  {hoveredStar === 4 && 'Great'}
                  {hoveredStar === 5 && 'Perfect'}
                </p>




                <button 
                  onClick={skipMovie}
                  className="bg-[#E85D22] text-white text-xs font-bold cursor-pointer uppercase tracking-wider px-6 py-2 rounded-full hover:bg-[#d04e1b] transition-colors"
                >
                  Skip
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateMoviesScreen;