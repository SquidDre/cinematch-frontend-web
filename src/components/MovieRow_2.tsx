import React from 'react';
import MovieCard from './MovieCard_1';

interface MovieData {
    id: string;
    title: string;
    platform: string;
    genre: string;
    match: string;
    posterUrl: string;
}

interface MovieRowProps {
    movies: MovieData[];
    title: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ movies, title }) => {
    return (
        <div className="flex flex-col mb-12 w-full">

            <h2 className="text-[#E85D22] text-sm font-bold tracking-widest uppercase mb-6">
                {title}
            </h2>
            
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandaroy snap-mandatory 
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {movies.map(movie => (
                    <MovieCard 
                        key={movie.id}
                        title={movie.title}
                        platform={movie.platform}
                        genre={movie.genre}
                        match={movie.match}
                        posterUrl={movie.posterUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieRow;