import React, { useState, useMemo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';

interface Stub {
    id: number;
    title: string;
    year: string;
    poster: string;
    match: number;
    genre: string;
    service: string;
    added: string;
}

const STUBS: Stub[] = [
    {
        id: 1,
        title: 'Dune: Part Two',
        year: '2024',
        poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        match: 94,
        genre: 'Sci-Fi',
        service: 'Netflix',
        added: 'Apr 10',
    },
    {
        id: 2,
        title: 'Oppenheimer',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        match: 91,
        genre: 'Drama',
        service: 'Prime',
        added: 'Apr 8',
    },
    {
        id: 3,
        title: 'Past Lives',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/k3waqVXSnSQdTOGWaFRBdSWRJsq.jpg',
        match: 88,
        genre: 'Romance',
        service: 'Hulu',
        added: 'Apr 5',
    },
    {
        id: 4,
        title: 'The Zone of Interest',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/hUu9zyZmKuTGAHwRmHBM85NuQqS.jpg',
        match: 85,
        genre: 'History',
        service: 'Max',
        added: 'Apr 3',
    },
    {
        id: 5,
        title: 'Killers of the Flower Moon',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/dB6PAXBQ9KXc2bSH0M0iFOFIEnO.jpg',
        match: 82,
        genre: 'Crime',
        service: 'Prime',
        added: 'Apr 1',
    },
    {
        id: 6,
        title: 'Poor Things',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXIRya0KEp3fqRP.jpg',
        match: 79,
        genre: 'Fantasy',
        service: 'Hulu',
        added: 'Mar 28',
    },
    {
        id: 7,
        title: 'Wonka',
        year: '2023',
        poster: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapnkaIX8CTgBt4gk.jpg',
        match: 76,
        genre: 'Musical',
        service: 'Max',
        added: 'Mar 25',
    },
    {
        id: 8,
        title: 'Civil War',
        year: '2024',
        poster: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
        match: 73,
        genre: 'Action',
        service: 'Netflix',
        added: 'Mar 22',
    },
];

const getBarcodePattern = (id: number): number[] => {
    const bars: number[] = [];
    let seed = (id + 7) * 1664525;
    for (let i = 0; i < 42; i++) {
        seed = (seed * 22695477 + 1) & 0x7fffffff;
        bars.push(seed % 7 < 1 ? 3 : seed % 7 < 3 ? 2 : 1);
    }
    return bars;
};

const RATING_LABELS: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Great',
    5: 'Perfect',
};

const Barcode: React.FC<{ id: number }> = ({ id }) => {
    const bars = useMemo(() => getBarcodePattern(id), [id]);
    return (
        <div className="flex items-stretch justify-center gap-[1.5px] h-10 px-6">
            {bars.map((width, i) => (
                <div key={i} className="bg-black shrink-0" style={{ width: `${width}px` }} />
            ))}
        </div>
    );
};

const InfoCell: React.FC<{ label: string; value: string; orange?: boolean; large?: boolean }> =
    ({
      label,
      value,
      orange,
      large,

     }) => (
    <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <p className={`font-bold ${large ? 'text-xl leading-none' : 'text-sm'} ${orange ? 'text-[#E85D22]' : 'text-black'}`}>
            {value}
        </p>
    </div>
);

interface StubCardProps {
    stub: Stub;
    onClick: () => void;
}

const StubCard: React.FC<StubCardProps> = ({ stub, onClick }) => (
    <div
        onClick={onClick}
        className="relative bg-white rounded-2xl shadow-md transition-all duration-300 select-none flex flex-col h-[412px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
    >
        <div className="flex-1 overflow-hidden rounded-t-2xl">
            <img src={stub.poster} alt={stub.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-2">
            <div className="px-4 pt-3 pb-3 border-r border-b border-gray-100">
                <InfoCell label="Match" value={`${stub.match}%`} orange large />
            </div>
            <div className="px-4 pt-3 pb-3 border-b border-gray-100">
                <InfoCell label="Genre" value={stub.genre} />
            </div>
            <div className="px-4 pt-3 pb-3 border-r border-gray-100">
                <InfoCell label="Service" value={stub.service} />
            </div>
            <div className="px-4 pt-3 pb-3">
                <InfoCell label="Added" value={stub.added} />
            </div>
        </div>

        <div className="relative flex items-center my-1">
            <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#0d0d0d] z-10" />
            <div className="w-full border-t-2 border-dashed border-gray-200 mx-3" />
            <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#0d0d0d] z-10" />
        </div>

        <div className="pt-2 pb-3">
            <Barcode id={stub.id} />
            <p className="text-center text-[7px] text-gray-300 tracking-widest mt-1">
                {String(stub.id).padStart(6, '0')}-CINEMATCH
            </p>
        </div>
    </div>
);

const WatchlistPage: React.FC = () => {
    const [selectedStub, setSelectedStub] = useState<Stub | null>(null);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [activeSort, setActiveSort] = useState<'recent' | 'match' | 'az'>('recent');
    const [isTearing, setIsTearing] = useState(false);
    const [removedStubs, setRemovedStubs] = useState<Set<number>>(new Set());

    const sortedStubs = [...STUBS]
        .filter(s => !removedStubs.has(s.id))
        .sort((a, b) => {
            if (activeSort === 'match') return b.match - a.match;
            if (activeSort === 'az') return a.title.localeCompare(b.title);
            return b.id - a.id;
        });

    const tearAndClose = (id: number) => {
        setIsTearing(true);
        setTimeout(() => {
            setRemovedStubs(prev => new Set([...prev, id]));
            setSelectedStub(null);
            setHoveredStar(null);
            setIsTearing(false);
        }, 700);
    };

    const closeModal = () => {
        if (isTearing) return;
        setSelectedStub(null);
        setHoveredStar(null);
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">

            <Navbar />

            <main className="px-10 pt-10 pb-16">
                <p className="text-[#E85D22] text-[10px] font-bold tracking-widest uppercase mb-1">
                    Saved to Watch
                </p>
                <h1 className="text-6xl font-serif text-white mb-8">Your Watchlist</h1>

                <div className="flex gap-3 mb-8">
                    {(
                        [
                            { key: 'recent', label: 'Recently Added' },
                            { key: 'match', label: 'Best Match' },
                            { key: 'az', label: 'A–Z' },
                        ] as const
                    ).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveSort(key)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
                                activeSort === key
                                    ? 'bg-[#E85D22] text-white'
                                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-10">
                    {sortedStubs.map(stub => (
                        <div key={stub.id} className="w-[302px]">
                            <StubCard
                                stub={stub}
                                onClick={() => setSelectedStub(stub)}
                            />
                        </div>
                    ))}
                </div>
            </main>

            {selectedStub && (
                <div
                    className="fixed inset-0 bg-black/[0.92] flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div className="flex flex-col items-center" onClick={e => e.stopPropagation()}>

                        <div className="w-full flex justify-end mb-3">
                            <button
                                onClick={closeModal}
                                className="text-white/50 hover:text-white transition-colors cursor-pointer"
                            >
                                <XMarkIcon className="w-7 h-7" />
                            </button>
                        </div>

                        <div className="relative bg-white rounded-t-2xl w-64 shadow-2xl">

                            <div className="w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
                                <img
                                    src={selectedStub.poster}
                                    alt={selectedStub.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="px-4 pt-3 pb-3 border-r border-b border-gray-100">
                                    <InfoCell label="Match" value={`${selectedStub.match}%`} orange large />
                                </div>
                                <div className="px-4 pt-3 pb-3 border-b border-gray-100">
                                    <InfoCell label="Genre" value={selectedStub.genre} />
                                </div>
                                <div className="px-4 pt-3 pb-3 border-r border-gray-100">
                                    <InfoCell label="Service" value={selectedStub.service} />
                                </div>
                                <div className="px-4 pt-3 pb-3">
                                    <InfoCell label="Added" value={selectedStub.added} />
                                </div>
                            </div>
                            <div className="pb-3" />
                        </div>

                        <div className="relative w-64 h-0 overflow-visible z-10">
                            <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#111] -translate-y-1/2" />
                            <div className="absolute left-3 right-3 top-0 border-t-2 border-dashed border-gray-300" />
                            <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#111] -translate-y-1/2" />
                        </div>

                        <div
                            className={`bg-white rounded-b-2xl w-64 pt-2 pb-3 shadow-2xl transition-all duration-700 ease-in-out ${
                                isTearing ? 'translate-y-14 opacity-0' : 'translate-y-0 opacity-100'
                            }`}
                        >
                            <Barcode id={selectedStub.id} />
                            <p className="text-center text-[8px] text-gray-300 tracking-widest mt-1">
                                {String(selectedStub.id).padStart(6, '0')}-CINEMATCH
                            </p>
                        </div>

                        <div
                            className={`bg-[#2a2a2a] rounded-2xl mt-3 px-6 py-5 w-64 shadow-2xl transition-all duration-700 ease-in-out ${
                                isTearing ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <p className="text-white text-base font-black tracking-widest uppercase mb-1 text-center">
                                Mark as Watched
                            </p>
                            <p className="text-gray-400 text-sm text-center mb-4">Give it a rating</p>

                            <div className="flex gap-1.5 justify-center mb-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(null)}
                                        onClick={() => tearAndClose(selectedStub.id)}
                                        className="cursor-pointer transition-transform hover:scale-110"
                                    >
                                        <StarIcon
                                            className={`w-9 h-9 transition-colors ${
                                                star <= (hoveredStar ?? 0) ? 'text-[#E85D22]' : 'text-[#555]'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <p className="text-center text-[#E85D22] text-sm font-bold h-5 mb-4">
                                {hoveredStar ? RATING_LABELS[hoveredStar] : ''}
                            </p>

                            <div className="border-t border-white/10 mb-4" />

                            <button
                                onClick={() => tearAndClose(selectedStub.id)}
                                className="w-full text-center text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
                            >
                                Skip &amp; mark as watched
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default WatchlistPage;
