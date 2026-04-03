import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  // Helper to check if a link is active to apply the white text
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 bg-[#0a0a0a] border-b border-white/5">
      {/* Left: Logo */}
      <div className="text-xl font-bold tracking-[0.2em] text-gray-400 cursor-pointer">
        CINEMATCH
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/home" className={`${isActive('/home') ? 'text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
          Home
        </Link>
        <Link to="/search" className={`${isActive('/search') ? 'text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
          Search
        </Link>
        <Link to="/watchlist" className={`${isActive('/watchlist') ? 'text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
          Watchlist
        </Link>
        <Link to="/ratings" className={`${isActive('/ratings') ? 'text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
          My ratings
        </Link>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-[#E85D22] flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
        <span className="text-gray-300 text-sm hidden sm:block hover:text-white transition-colors">
          John D.
        </span>
      </div>
    </nav>
  );
};

export default Navbar;