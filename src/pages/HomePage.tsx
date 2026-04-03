import React from 'react';
import Navbar from '../components/NavBar';

const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
    </div>
  );
};

export default HomeScreen;