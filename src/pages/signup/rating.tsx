import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

// TMDB Genre Map to convert IDs to text
const GENRE_MAP: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

// Reverse map to convert text back to IDs for the TMDB API
const REVERSE_GENRE_MAP: Record<string, number> = Object.entries(GENRE_MAP).reduce((acc, [id, name]) => {
  acc[name] = Number(id);
  return acc;
}, {} as Record<string, number>);

const RateMoviesScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const [isCardShrunk, setIsCardShrunk] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number | 'skipped'>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [movieQueue, setMovieQueue] = useState<any[]>([]);
  const [isFetchingMovies, setIsFetchingMovies] = useState(true);

  const currentMovie = movieQueue[currentIndex];
  const totalMovies = movieQueue.length; 
  const isFinished = totalMovies > 0 && currentIndex >= totalMovies;

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        // Default to popular movies as a fallback
        let TMDBurl = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`;

        // Check for user genres in local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Assuming user.genres is an array of strings like ["Action", "Sci-Fi"]
          if (user.genres && Array.isArray(user.genres) && user.genres.length > 0) {
            // Map the strings to TMDB IDs
            const genreIds = user.genres
              .map((genre: string) => REVERSE_GENRE_MAP[genre])
              .filter(Boolean); // Filter out any undefined matches

            if (genreIds.length > 0) {
              // Use the discover endpoint. 
              // Using a pipe '|' means OR (movies that have Action OR Sci-Fi)
              // If you wanted AND (movies that are Action AND Sci-Fi), you would use a comma ','
              TMDBurl = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&with_genres=${genreIds.join('|')}`;
            }
          }
        }

        const response = await fetch(TMDBurl);

        if (!response.ok) throw new Error('Failed to fetch movies. Please try again later.');

        const data = await response.json();

        // Shuffled the results so the user doesn't get the exact same 8 movies every time
        const shuffledResults = data.results.sort(() => 0.5 - Math.random());

        const formattedMovies = shuffledResults.slice(0, 8).map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
          poster: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Poster',
          director: 'Cinematch Pick', 
          genres: movie.genre_ids 
            ? movie.genre_ids.slice(0, 2).map((id: number) => GENRE_MAP[id]).filter(Boolean)
            : ['Popular']
        }));

        setMovieQueue(formattedMovies);
        
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching movies.');
      } finally {
        setIsFetchingMovies(false);
      }
    };
    
    fetchInitialMovies();
  }, []);

  const handleNextMovie = (action: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      action();
      setCurrentIndex((prev) => prev + 1);
      setIsFading(false);
      setHoveredStar(null);
    }, 300);
  };

  const rateMovie = async (rating: number) => {
    setIsLoading(true);
    setError('');
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError('No user data found. Please sign in again.');
        return;
      }
      
      const user = JSON.parse(storedUser);
      const payload = { 
        userId: user._id,
        movieId: currentMovie.id,
        rating: rating,
        CreatedAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit rating. Please try again.');

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }

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
    navigate('/home');
  };

  if (isFetchingMovies) {
    return (
      <div className="flex min-h-screen bg-black text-white items-center justify-center font-sans">
        <div className="animate-pulse text-2xl text-[#E85D22] font-serif italic tracking-wider">
          Fetching your movies...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-white selection:bg-[#E85D22] selection:text-white">
      <div className="flex flex-col lg:flex-row flex-grow">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/2 bg-[#141414] p-8 md:p-16 flex flex-col justify-between lg:border-r lg:border-[#333] min-h-[50vh] lg:min-h-0">
          
          <div className="flex justify-between w-full mb-24">
            <div className="text-xl font-bold tracking-[0.2em] ml-4 text-gray-500">
              CINEMATCH
            </div>
            <div className="text-sm text-gray-500 font-medium tracking-wide">
              Step <span className="font-bold">3</span> of 3
            </div>
          </div>

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

            <div className="max-w-md">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                <span>Your ratings</span>
                <span><strong className="text-[#E85D22]">{currentIndex}</strong> of {totalMovies} rated</span>
              </div>
              <div className="w-full bg-black border border-[#333] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#E85D22] h-full transition-all duration-500 ease-out"
                  style={{ width: totalMovies > 0 ? `${(currentIndex / totalMovies) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-lg w-max text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className={`ml-0 lg:ml-4 transition-opacity duration-500 ease-in-out`}>
            {isFinished ? (
              <div className="animate-fade-in-up">
                <h2 className="text-4xl font-serif italic text-[#E85D22] mb-4">All set!</h2>
                <p className="text-gray-400 mb-8">We've locked in your tastes.</p>
                <button 
                  onClick={handleFinish}
                  className="bg-[#E85D22] hover:bg-[#d04e1b] text-white px-8 py-3.5 rounded-full font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  See my picks <span>&rarr;</span>
                </button>
              </div>
            ) : (
              <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentMovie?.genres?.map((genre: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 border border-[#E85D22] bg-[#2A1200] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">
                  {currentMovie?.title}
                </h2>
                <p className="text-gray-500">
                  {currentMovie?.director} • {currentMovie?.year}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Column --- */}
        <div className="w-full lg:w-1/2 bg-black p-8 md:p-16 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0">
          
          {!isFinished && currentMovie && (
            <div 
              onClick={() => !isCardShrunk && setIsCardShrunk(true)}
              className={`relative flex flex-col items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCardShrunk 
                  ? 'w-full max-w-md bg-white rounded-[2rem] p-6 cursor-default' 
                  : 'w-full max-w-md xl:max-w-lg bg-transparent rounded-2xl p-0 cursor-pointer hover:scale-[1.02]'
              } ${isFading ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
            >
              
              <div className={`w-full transition-all duration-700 overflow-hidden ${isCardShrunk ? 'aspect-[2/3] rounded-xl' : 'aspect-[2/3] rounded-2xl shadow-2xl'}`}>
                <img 
                  src={currentMovie.poster} 
                  alt={currentMovie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                
                {!isCardShrunk && (
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8">
                      <span className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold text-sm border border-white/30">
                          Tap to Rate
                      </span>
                   </div>
                )}
              </div>

              <div className={`flex flex-col items-center w-full transition-all duration-500 ${isCardShrunk ? 'opacity-100 mt-6 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                <h3 className="text-black font-serif text-2xl mb-1 text-center leading-tight">{currentMovie.title}</h3>
                <p className="text-gray-400 text-xs mb-4">{currentMovie.director} • {currentMovie.year}</p>
                
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => rateMovie(star)}
                      disabled={isLoading}
                      className="transition-transform hover:scale-110 focus:outline-none cursor-pointer disabled:opacity-50"
                    >
                      {(hoveredStar !== null && star <= hoveredStar) ? (
                        <StarSolid className="w-8 h-8 text-[#E85D22]" />
                      ) : (
                        <StarSolid className="w-8 h-8 text-gray-200 hover:text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>

                <p className="text-[#E85D22] text-sm font-semibold mb-4 h-5">
                  {hoveredStar === 1 && 'Poor'}
                  {hoveredStar === 2 && 'Fair'}
                  {hoveredStar === 3 && 'Good'}
                  {hoveredStar === 4 && 'Great'}
                  {hoveredStar === 5 && 'Perfect'}
                </p>

                <button 
                  onClick={skipMovie}
                  disabled={isLoading}
                  className="bg-[#E85D22] text-white text-xs font-bold cursor-pointer uppercase tracking-wider px-6 py-2 rounded-full hover:bg-[#d04e1b] transition-colors disabled:opacity-50"
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