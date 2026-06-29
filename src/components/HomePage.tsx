import React, { useState, useEffect, useCallback } from 'react';
import { Search, Gamepad2, Laptop as LaptopIcon } from 'lucide-react';
import { fetchGames, RawgGame } from '../api/rawg';
import { laptops, Laptop } from '../data/mockData';
import { getTierColor } from './helpers';

interface HomePageProps {
  onSelectGame: (game: RawgGame) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export default function HomePage({ onSelectGame, onSelectLaptop }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const quickFilters = ["Cyberpunk 2077", "Valorant", "GTA V", "Elden Ring"];

  const loadGames = useCallback(async (query: string, pg: number, append: boolean) => {
    setLoading(true);
    try {
      const data = await fetchGames(query, pg);
      setTotalGames(data.count);
      setHasMore(!!data.next);
      setGames(prev => append ? [...prev, ...data.results] : data.results);
    } catch { setGames([]); }
    setLoading(false);
  }, []);

  useEffect(() => { setPage(1); loadGames(searchQuery, 1, false); }, [searchQuery, loadGames]);

  const loadMore = () => { const np = page + 1; setPage(np); loadGames(searchQuery, np, true); };

  const filteredLaptops = searchQuery
    ? laptops.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.gpu.toLowerCase().includes(searchQuery.toLowerCase()))
    : laptops;

  return (
    <div className="w-full">
      <div className="text-center mb-10 w-full">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
          <span className="text-cyan-400">RUN</span>{' '}
          <span className="text-indigo-500">IT</span>{' '}
          <span className="text-white">UP</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Check laptop compatibility, compare FPS, battery life & find the perfect gaming setup.
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-2xl mx-auto mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-teal-500" />
        </div>
        <input type="text" className="block w-full pl-12 pr-4 py-4 bg-[#18181b]/80 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all backdrop-blur-sm shadow-xl" placeholder="Search games or laptops..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16 w-full">
        {quickFilters.map(f => (
          <button key={f} onClick={() => setSearchQuery(f)} className="px-5 py-2 rounded-full border border-zinc-800 bg-[#09090b]/50 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all">{f}</button>
        ))}
        {searchQuery && <button onClick={() => setSearchQuery('')} className="px-5 py-2 rounded-full border border-teal-900 bg-teal-900/20 text-teal-400 text-sm transition-all">Clear Search</button>}
      </div>

      {/* Games */}
      <div className="w-full mt-12 mb-20">
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 className="w-6 h-6 text-teal-400" />
          <h2 className="text-2xl font-bold text-white">Browse Games</h2>
        </div>
        <p className="text-zinc-500 text-sm mb-6">{totalGames.toLocaleString()} games found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && games.length === 0 ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#18181b]/50 border border-zinc-800 rounded-xl h-24 animate-pulse"></div>
          )) : games.length > 0 ? games.map(game => (
            <div key={game.id} onClick={() => onSelectGame(game)} className="bg-[#18181b]/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-teal-500/30 transition-all cursor-pointer flex items-center p-3 gap-3">
              {game.background_image ? (
                <img src={game.background_image} alt={game.name} className="w-12 h-12 rounded-lg object-cover border border-zinc-700 shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 shrink-0">{game.name.substring(0, 2).toUpperCase()}</div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold truncate text-sm">{game.name}</h3>
                <p className="text-zinc-500 text-xs mt-1 truncate">{game.genres?.map(g => g.name).join(', ') || 'Game'}</p>
              </div>
            </div>
          )) : <div className="col-span-full text-center text-zinc-500 py-10">No games found</div>}
        </div>
        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button onClick={loadMore} className="px-8 py-3 rounded-full border border-teal-700 bg-teal-900/20 text-teal-400 text-sm font-medium hover:bg-teal-900/40 transition-all">Load More Games</button>
          </div>
        )}
        {loading && games.length > 0 && <div className="text-center mt-6 text-zinc-500 text-sm">Loading more games...</div>}
      </div>

      {/* Laptops */}
      <div className="w-full mb-20">
        <div className="flex items-center gap-3 mb-6">
          <LaptopIcon className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Browse Laptops & PCs</h2>
          <span className="text-zinc-500 text-sm ml-auto">{filteredLaptops.length} devices</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLaptops.map(laptop => (
            <div key={laptop.id} onClick={() => onSelectLaptop(laptop)} className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-5 group hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div><h3 className="text-white font-bold text-sm mb-1">{laptop.name}</h3><p className="text-zinc-400 text-sm">${laptop.price}</p></div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${getTierColor(laptop.tier)}`}>{laptop.tier}</span>
              </div>
              <div className="space-y-1.5 mt-auto text-xs text-zinc-500">
                <div><span className="w-14 inline-block">GPU:</span><span className="text-zinc-300">{laptop.gpu}</span></div>
                <div><span className="w-14 inline-block">CPU:</span><span className="text-zinc-300">{laptop.cpu}</span></div>
                <div><span className="w-14 inline-block">RAM:</span><span className="text-zinc-300">{laptop.ram}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
