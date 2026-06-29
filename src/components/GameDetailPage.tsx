import React, { useState, useEffect } from 'react';
import { ArrowLeft, Laptop as LaptopIcon, Battery, DollarSign, ArrowUpDown } from 'lucide-react';
import { fetchGameDetail, getPCRequirements, parseReqField, RawgGame, RawgGameDetail } from '../api/rawg';
import { laptops, calculatePerformance, getGameDemand, Laptop } from '../data/mockData';
import { getTagStyles, SortMode } from './helpers';

interface GameDetailPageProps {
  game: RawgGame;
  onBack: () => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export default function GameDetailPage({ game, onBack, onSelectLaptop }: GameDetailPageProps) {
  const [detail, setDetail] = useState<RawgGameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('compat');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchGameDetail(game.id).then(data => {
      if (isMounted) {
        setDetail(data);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [game.id]);

  const reqs = detail ? getPCRequirements(detail) : getPCRequirements(game);
  const minReqText = reqs?.minimum || '';
  const recReqText = reqs?.recommended || '';

  const minCpu = parseReqField(minReqText, 'processor') || parseReqField(minReqText, 'cpu');
  const minGpu = parseReqField(minReqText, 'graphics') || parseReqField(minReqText, 'gpu');
  const minRam = parseReqField(minReqText, 'memory') || parseReqField(minReqText, 'ram');
  const minStorage = parseReqField(minReqText, 'storage');

  const recCpu = parseReqField(recReqText, 'processor') || parseReqField(recReqText, 'cpu');
  const recGpu = parseReqField(recReqText, 'graphics') || parseReqField(recReqText, 'gpu');
  const recRam = parseReqField(recReqText, 'memory') || parseReqField(recReqText, 'ram');
  const recStorage = parseReqField(recReqText, 'storage');

  const demand = getGameDemand(game, recReqText || minReqText);

  const processedLaptops = laptops.map(laptop => {
    const perf = calculatePerformance(laptop.gpu, demand);
    return { laptop, perf };
  });

  processedLaptops.sort((a, b) => {
    if (sortMode === 'compat') return b.perf.score - a.perf.score;
    if (sortMode === 'fps') return b.perf.fps - a.perf.fps;
    if (sortMode === 'price-asc') return a.laptop.price - b.laptop.price;
    if (sortMode === 'price-desc') return b.laptop.price - a.laptop.price;
    return 0;
  });

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 relative z-10">
          {game.background_image ? (
            <img src={game.background_image} alt={game.name} className="w-24 h-24 rounded-2xl object-cover border border-zinc-700 shadow-lg shrink-0" />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-900/50 to-indigo-900/50 border border-teal-500/20 flex items-center justify-center text-3xl font-bold text-teal-400 shrink-0">
              {game.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
            <p className="text-zinc-400 text-sm">
              {game.genres?.map(g => g.name).join(', ') || 'Game'} • Released: {game.released || 'N/A'}
              {game.metacritic && <span className="ml-3 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-xs">Metacritic: {game.metacritic}</span>}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-6 text-zinc-500 text-sm">Fetching detailed system requirements...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-[#09090b]/60 rounded-xl p-5 border border-zinc-800/80">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Minimum Requirements</h3>
              <div className="space-y-2 text-sm text-zinc-300">
                <p><span className="text-zinc-500 w-20 inline-block">CPU:</span> {minCpu}</p>
                <p><span className="text-zinc-500 w-20 inline-block">GPU:</span> {minGpu}</p>
                <p><span className="text-zinc-500 w-20 inline-block">RAM:</span> {minRam}</p>
                <p><span className="text-zinc-500 w-20 inline-block">Storage:</span> {minStorage}</p>
              </div>
            </div>
            <div className="bg-teal-950/20 rounded-xl p-5 border border-teal-500/30">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-4">Recommended Requirements</h3>
              <div className="space-y-2 text-sm text-zinc-300">
                <p><span className="text-zinc-500 w-20 inline-block">CPU:</span> {recCpu !== 'Not specified' ? recCpu : minCpu}</p>
                <p><span className="text-zinc-500 w-20 inline-block">GPU:</span> {recGpu !== 'Not specified' ? recGpu : minGpu}</p>
                <p><span className="text-zinc-500 w-20 inline-block">RAM:</span> {recRam !== 'Not specified' ? recRam : minRam}</p>
                <p><span className="text-zinc-500 w-20 inline-block">Storage:</span> {recStorage !== 'Not specified' ? recStorage : minStorage}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Laptop Compatibility Header & Sort Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">Laptop Compatibility</h2>
        
        {/* Sort Buttons in Corner */}
        <div className="flex flex-wrap items-center gap-2 bg-[#18181b] p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
          <span className="text-xs text-zinc-500 px-2 flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> Sort by:</span>
          <button
            onClick={() => setSortMode('compat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'compat' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            Compatibility
          </button>
          <button
            onClick={() => setSortMode('fps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'fps' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            FPS
          </button>
          <button
            onClick={() => setSortMode('price-asc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'price-asc' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => setSortMode('price-desc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortMode === 'price-desc' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'text-zinc-400 hover:text-white'}`}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-20">
        {processedLaptops.map(({ laptop, perf }) => {
          const styles = getTagStyles(perf.tag);
          return (
            <div
              key={laptop.id}
              onClick={() => onSelectLaptop(laptop)}
              className="bg-[#18181b]/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-teal-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                  <LaptopIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
                    {laptop.name}
                    <span className="text-xs font-normal text-teal-400 bg-teal-950/40 px-2 py-0.5 rounded border border-teal-800/30">${laptop.price}</span>
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{laptop.cpu} • {laptop.gpu} • {laptop.ram}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm font-medium w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-zinc-800/60">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${styles.bg} ${styles.color} border-current/20 shrink-0`}>
                  {styles.icon}
                  {perf.tag}
                </div>
                <div className="text-zinc-300 shrink-0 font-semibold w-28 text-right md:text-left">{perf.fps} FPS</div>
                <div className="flex items-center gap-1 text-zinc-500 shrink-0"><Battery className="w-4 h-4 text-zinc-600" /> {perf.battery}</div>
                <div className="text-zinc-500 shrink-0 w-12 text-right">{perf.resolution}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
