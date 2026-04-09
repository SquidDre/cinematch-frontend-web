import React from 'react';
import Navbar from '../components/Navbar';
import MovieRow_1 from '../components/MovieRow_1';
import MovieRow_2 from '../components/MovieRow_2';

const HomeScreen: React.FC = () => {

    try {
        const storedUser = localStorage.getItem("user");
        
        if (!storedUser) {
          console.error('No user data found. Please sign in again.');
          return null; // Or you could redirect to the login page
        }
    } catch (error) {
        console.error('Error occurred while fetching user data:', error);
        return null;
    }

    const sampleMovies = [
        {
            id: '1', title: 'Interstellar', platform: 'Netflix', genre: 'SCI-FI', match: '97%',
            posterUrl: 'https://image.tmdb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg'
        },
        {
            id: '2', title: 'Marty Supreme', platform: 'Hulu', genre: 'DRAMA', match: '81%',
            posterUrl: 'https://image.tmdb.org/t/p/w1280/u68AjlvlutfEIcpmbYpKcdi09ut.jpg'
        },
        {
            id: '3', title: 'The Martian', platform: 'Apple TV+', genre: 'SCI-FI', match: '92%',
            posterUrl: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg'
        },
        {
            id: '4', title: 'Gravity', platform: 'Netflix', genre: 'SCI-FI', match: '89%',
            posterUrl: 'https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg'
        }
    ];
    return (
        <div className="min-h-fit bg-black text-white font-sans">
            <Navbar />
            <div className="max-w-full pl-16 pt-8">
                <MovieRow_1 title="Picked For You Today" movies={sampleMovies} />
            </div>
            <div className="max-w-full pl-16">
                <MovieRow_2 title="Because you watched Interstellar" movies={sampleMovies} />
            </div>
            <div className="max-w-full pl-16">
                <MovieRow_2 title="Because you watched Interstellar" movies={sampleMovies} />
            </div>
            <div className="max-w-full pl-16">
                <MovieRow_2 title="Because you watched Interstellar" movies={sampleMovies} />
            </div>
            {/* 1. The Outer Wrapper (The Trigger Area)
  Pinned to the right side of the screen. We give it the 'group' class to track the mouse. 
*/}
            <div className="fixed top-20 right-0 pointer-events-none h-screen flex justify-end z-50">
            
                {/* 2. The Invisible Hitbox
                    This is a transparent strip on the far right edge of the screen. 
                    When the mouse enters this strip, it triggers the 'group-hover'.
                */}
                <div className="peer w-8 h-full pointer-events-auto bg-transparent absolute right-0 z-40"></div>

                {/* 3. The Sliding Panel
                    Starts pushed completely off-screen using `translate-x-full`.
                    When the group is hovered, it slides to its normal position `translate-x-0`.
                */}
                <div className="relative w-100 h-full bg-[#0a0a0a] border-l border-t border-white/5 shadow-2xl pointer-events-auto transform translate-x-full peer-hover:translate-x-0 hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-8">
                    
                    <h2 className="text-white text-2xl font-serif mb-4"></h2>
                
                
                {/* You could put mini movie cards or watchlist items here! */}
                
            </div>

            </div>
        </div>

        
    );
};

export default HomeScreen;