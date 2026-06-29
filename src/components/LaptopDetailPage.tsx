import React, { useState, useEffect } from 'react';
import { ArrowLeft, Laptop as LaptopIcon, ArrowUpDown, Gamepad2 } from 'lucide-react';
import { fetchGames, RawgGame } from '../api/rawg';
import { calculatePerformance, Laptop, getLaptopPower, getGameDemand } from '../data/mockData';
import { getTierColor, getTagStyles, SortMode } from './helpers';

interface LaptopDetailPageProps {
  laptop: Laptop;
  onBack: () => void;
  onSelectGame: (game: RawgGame) => void;
}

export default function LaptopDetailPage({ laptop, onBack, onSelectGame }: LaptopDetailPageProps) {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('compat');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchGames('', 1).then(data => {
      if (isMounted) {
        setGames(data.results);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const power = getLaptopPower(laptop.gpu);

  const processedGames = games.map(game => {
    const demand = getGameDemand(game);
    const perf = calculatePerformance(laptop.gpu, demand);
    return { game, perf };
  });

  processedGames.sort((a, b) => {
    if (sortMode === 'compat' || sortMode === 'fps') return b.perf.fps - a.perf.fps;
    if (sortMode === 'price-asc') return a.game.name.localeCompare(b.game.name);
    return 0;
  });

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 flex items-center justify-center text-4xl font-bold text-indigo-400 shadow-inner shrink-0">
          <LaptopIcon className="w-12 h-12" />
        </div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{laptop.name}</h1>
              <p className="text-zinc-400 text-sm">${laptop.price} • {laptop.tier}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-md border self-start md:self-auto ${getTierColor(laptop.tier)}`}>
              {laptop.tier}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
              <div className="text-zinc-500 text-xs uppercase font-bold mb-1">GPU</div>
              <div className="text-sm text-zinc-200 font-medium">{laptop.gpu}</div>
            </div>
            <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
              <div className="text-zinc-500 text-xs uppercase font-bold mb-1">CPU</div>
              <div className="text-sm text-zinc-200 font-medium">{laptop.cpu}</div>
            </div>
            <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
              <div className="text-zinc-500 text-xs uppercase font-bold mb-1">RAM & Storage</div>
              <div className="text-sm text-zinc-200 font-medium">{laptop.ram} • {laptop.storage}</div>
            </div>
            <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
              <div className="text-zinc-500 text-xs uppercase font-bold mb-1">Power Level</div>
              <div className="text-sm text-indigo-400 font-bold">{power}/10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Header & Sorting Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-6 h-6 text-teal-400" />
          <h2 className="text-xl font-bold text-white">Game Playability on this Laptop</h2>
        </div>

        <div className="flex items-center gap-2 bg-[#18181b] p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
          <span className="text-xs text-zinc-500 px-2 flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> Sort by:</span>
          <button
            onClick={() => setSortMode('compat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'compat' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            Highest FPS
          </button>
          <button
            onClick={() => setSortMode('price-asc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'price-asc' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            Alphabetical
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-500 text-sm">Loading game playability benchmarks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {processedGames.map(({ game, perf }) => {
            const styles = getTagStyles(perf.tag);
            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game)}
                className="bg-[#18181b]/50 border border-zinc-800/50 rounded-xl p-5 flex flex-col gap-4 hover:border-teal-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {game.background_image ? (
                    <img src={game.background_image} alt={game.name} className="w-12 h-12 rounded-lg object-cover border border-zinc-700 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 shrink-0">
                      {game.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white text-base truncate">{game.name}</h4>
                    <p className="text-xs text-zinc-500 truncate">{game.genres?.map(g=>g.name).join(', ') || 'Game'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-800/40">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${styles.bg} ${styles.color} border-current/20 text-xs font-semibold`}>
                    {styles.icon}
                    {perf.tag}
                  </div>
                  <div className="text-zinc-300 text-sm font-bold">{perf.fps} FPS</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
