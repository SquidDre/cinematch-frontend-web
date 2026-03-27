import React, { useState } from 'react';

const CinematchScreen: React.FC = () => {
  
  // Simulating the duplicate buttons shown in the mockup
  const genreList: string[] = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi',
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'
  ];

  // Added <number[]> to strictly type the array of selected indices
  const [selected, setSelected] = useState<number[]>([]);

  // Added type annotation for the index parameter
  const toggleService = (index: number): void => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#E85D22] selection:text-white flex">
      {/* Header */}
      <div className="f justify-between items-center px-8 py-6 border-b border-[#222] bg-orange-100 w-[45%] flex-col justify-between">
        <div className="text-xl font-bold tracking-[0.2em] text-black mb-24 ml-4">
          CINEMATCH
        </div>
        <div className="ml-4">
          <h1 className="text-7xl md:text-8xl font-serif tracking-tight leading-none text-black">
            Pick your<span className="text-black"></span>
          </h1>
          
          <h1 className="text-7xl md:text-8xl font-serif italic text-[#E85D22] tracking-tight leading-none mb-4">
            favorites.
          </h1>
            <p className="text-gray-400 text-lg mb-12">
            Pick your genres, We'll tailor your picks to match your tastes.
            </p>
        </div>
        <div className="text-sm text-gray-400 ml-4 mb-8 mt-120 tracking-wide">
          Step 1 of 3
        </div>
      </div>



      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 pt-16 pb-12 bg-black w-[55%]">
        {/* Eyebrow text */}
        <p className="text-[#E85D22] text-xs font-bold tracking-widest uppercase mb-6">
          Select all that apply
        </p>

        {/* Hero Typography */}
        

        

        {/* Grid of Genres */}
        <div className="flex flex-wrap gap-4 mb-24">
          {genreList.map((genre, index) => {
            const isSelected = selected.includes(index);
            return (
              <button
                key={index}
                onClick={() => toggleService(index)}
                className={`flex items-center justify-center gap-2 py-5 px-9 rounded-full border transition-all duration-200 ease-in-out
                  ${isSelected 
                    ? 'border-[#E85D22] text-white bg-[#E85D22]/10' 
                    : 'border-[#333] text-gray-300 hover:border-gray-400 hover:text-white'
                  }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-[#E85D22]' : 'bg-gray-500'}`}></span>
                <span className="font-semibold text-sm md:text-base">{genre}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-125">
          <div className="text-gray-400 text-lg gap-2 mt-4">
            <span className="text-[#E85D22] font-bold">{selected.length}</span> selected
          </div>
          
          <div className="flex items-center gap-8">
            <button className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2">
              <span>&larr;</span> Back
            </button>
            <button className="bg-[#E85D22] hover:bg-[#d04e1b] text-white px-8 py-3.5 rounded-full font-bold transition-colors flex items-center gap-2">
              Continue <span>&rarr;</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CinematchScreen;