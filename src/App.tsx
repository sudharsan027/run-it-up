import React, { useState } from 'react';
import { Sparkles, BarChart3, Search, Gamepad2, Laptop, Flame, Battery, Zap, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { games, laptops, calculatePerformance, Game, Laptop as LaptopType } from './data/mockData';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedLaptop, setSelectedLaptop] = useState<LaptopType | null>(null);

  const quickFilters = ["Cyberpunk 2077", "Valorant", "GTA V", "Elden Ring"];

  const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()) || game.genre.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredLaptops = laptops.filter(laptop => laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) || laptop.gpu.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleBack = () => {
    setSelectedGame(null);
    setSelectedLaptop(null);
    setSearchQuery('');
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "HIGH-END": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "MID-RANGE": return "text-teal-400 bg-teal-400/10 border-teal-400/20";
      case "BUDGET": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      default: return "text-zinc-400 bg-zinc-800 border-zinc-700";
    }
  };

  const getTagStyles = (tag: string) => {
    switch(tag) {
      case "Ultra": return { color: "text-purple-400", bg: "bg-purple-400/10", icon: <ShieldCheck className="w-3 h-3" /> };
      case "High": return { color: "text-orange-400", bg: "bg-orange-400/10", icon: <Flame className="w-3 h-3" /> };
      case "Medium": return { color: "text-green-400", bg: "bg-green-400/10", icon: <CheckCircle2 className="w-3 h-3" /> };
      case "Low Settings": return { color: "text-yellow-400", bg: "bg-yellow-400/10", icon: <AlertTriangle className="w-3 h-3" /> };
      case "Not Playable": return { color: "text-red-400", bg: "bg-red-400/10", icon: <XCircle className="w-3 h-3" /> };
      default: return { color: "text-zinc-400", bg: "bg-zinc-800", icon: null };
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans relative overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none fixed"></div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider cursor-pointer" onClick={handleBack}>
          <span className="text-cyan-400">RUN</span>
          <span className="text-indigo-400">IT</span>
          <span className="text-white">UP</span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#18181b] p-1.5 rounded-full border border-zinc-800/50">
          <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 bg-teal-900/40 text-teal-400 rounded-full text-sm font-medium transition-colors">
            <Sparkles className="w-4 h-4" />
            Home
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white rounded-full text-sm font-medium transition-colors">
            <BarChart3 className="w-4 h-4" />
            Compare
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col items-center pt-8 md:pt-24 px-4 w-full max-w-7xl mx-auto">
        
        {/* VIEW: MAIN DASHBOARD */}
        {!selectedGame && !selectedLaptop && (
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

            <div className="w-full max-w-2xl mx-auto mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-teal-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-[#18181b]/80 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all backdrop-blur-sm shadow-xl"
                placeholder="Search games or laptops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-24 w-full">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchQuery(filter)}
                  className="px-5 py-2 rounded-full border border-zinc-800 bg-[#09090b]/50 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all backdrop-blur-sm"
                >
                  {filter}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2 rounded-full border border-teal-900 bg-teal-900/20 text-teal-400 text-sm hover:text-teal-300 transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>

            <div className="w-full mt-12 mb-20">
              <div className="flex items-center gap-3 mb-8">
                <Gamepad2 className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">Browse Games</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGames.length > 0 ? filteredGames.map((game) => (
                  <div key={game.id} onClick={() => setSelectedGame(game)} className="bg-[#18181b]/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-teal-500/30 transition-all cursor-pointer flex items-center p-4 gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-sm font-bold border border-zinc-700 text-zinc-300 group-hover:from-teal-900/40 group-hover:to-teal-800/40 group-hover:text-teal-400 transition-colors">
                      {game.iconInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate text-sm">{game.title}</h3>
                        <p className="text-zinc-500 text-xs mt-1 truncate">{game.genre} - {game.releaseYear}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center text-zinc-500 py-10">No games found matching "{searchQuery}"</div>
                )}
              </div>
            </div>

            <div className="w-full mb-20">
              <div className="flex items-center gap-3 mb-8">
                <Laptop className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Browse Laptops</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLaptops.length > 0 ? filteredLaptops.map((laptop) => (
                  <div key={laptop.id} onClick={() => setSelectedLaptop(laptop)} className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-5 group hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-bold text-base mb-1">{laptop.name}</h3>
                          <p className="text-zinc-400 text-sm">${laptop.price}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${getTierColor(laptop.tier)}`}>
                          {laptop.tier}
                        </span>
                    </div>
                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center text-xs text-zinc-500"><span className="w-16">GPU:</span><span className="text-zinc-300 font-medium">{laptop.gpu}</span></div>
                        <div className="flex items-center text-xs text-zinc-500"><span className="w-16">CPU:</span><span className="text-zinc-300 font-medium">{laptop.cpu}</span></div>
                        <div className="flex items-center text-xs text-zinc-500"><span className="w-16">RAM:</span><span className="text-zinc-300 font-medium">{laptop.ramStorage}</span></div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center text-zinc-500 py-10">No laptops found matching "{searchQuery}"</div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* VIEW: GAME DETAIL */}
        {selectedGame && (
          <div className="w-full">
            <button onClick={handleBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-900/50 to-indigo-900/50 border border-teal-500/20 flex items-center justify-center text-2xl font-bold text-teal-400 shadow-inner">
                  {selectedGame.iconInitials}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{selectedGame.title}</h1>
                  <p className="text-zinc-400 text-sm">{selectedGame.genre} • {selectedGame.releaseYear}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#09090b]/50 rounded-xl p-5 border border-zinc-800/50">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Minimum Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-zinc-400 w-20 inline-block">CPU:</span> {selectedGame.minReq.cpu}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">GPU:</span> {selectedGame.minReq.gpu}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">RAM:</span> {selectedGame.minReq.ram}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">Storage:</span> {selectedGame.minReq.storage}</p>
                  </div>
                </div>
                <div className="bg-teal-900/10 rounded-xl p-5 border border-teal-500/20">
                  <h3 className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-4">Recommended</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-zinc-400 w-20 inline-block">CPU:</span> {selectedGame.recReq.cpu}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">GPU:</span> {selectedGame.recReq.gpu}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">RAM:</span> {selectedGame.recReq.ram}</p>
                    <p><span className="text-zinc-400 w-20 inline-block">Storage:</span> {selectedGame.recReq.storage}</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Laptop Compatibility</h2>
            <div className="flex flex-col gap-3 pb-20">
              {laptops.map(laptop => {
                const perf = calculatePerformance(laptop, selectedGame);
                return { laptop, perf };
              }).sort((a, b) => b.perf.fps - a.perf.fps).map(({ laptop, perf }, idx) => {
                const styles = getTagStyles(perf.tag);
                return (
                  <div key={laptop.id} className="bg-[#18181b]/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm md:text-base">{laptop.name}</h4>
                        <p className="text-xs text-zinc-500">{laptop.cpu} • {laptop.gpu} • {laptop.ramStorage.split(" - ")[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs md:text-sm font-medium w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${styles.bg} ${styles.color} border-current/20 shrink-0`}>
                        {styles.icon}
                        {perf.tag}
                      </div>
                      <div className="text-zinc-400 shrink-0 w-28">{perf.fps} FPS ({perf.tag.split(' ')[0]})</div>
                      <div className="flex items-center gap-1 text-zinc-500 shrink-0"><Battery className="w-4 h-4 text-zinc-600" /> {perf.battery}</div>
                      <div className="text-zinc-500 shrink-0 w-12 text-right">{perf.resolution}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: LAPTOP DETAIL */}
        {selectedLaptop && (
          <div className="w-full">
            <button onClick={handleBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 flex items-center justify-center text-4xl font-bold text-indigo-400 shadow-inner shrink-0">
                <Laptop className="w-12 h-12" />
              </div>
              <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedLaptop.name}</h1>
                    <p className="text-zinc-400 text-sm">${selectedLaptop.price} • {selectedLaptop.tier}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-md border ${getTierColor(selectedLaptop.tier)}`}>
                    {selectedLaptop.tier}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
                    <div className="text-zinc-500 text-xs uppercase font-bold mb-1">GPU</div>
                    <div className="text-sm text-zinc-200">{selectedLaptop.gpu}</div>
                  </div>
                  <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
                    <div className="text-zinc-500 text-xs uppercase font-bold mb-1">CPU</div>
                    <div className="text-sm text-zinc-200">{selectedLaptop.cpu}</div>
                  </div>
                  <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
                    <div className="text-zinc-500 text-xs uppercase font-bold mb-1">RAM & Storage</div>
                    <div className="text-sm text-zinc-200">{selectedLaptop.ramStorage}</div>
                  </div>
                  <div className="bg-[#09090b]/50 rounded-xl p-4 border border-zinc-800/50 text-center">
                    <div className="text-zinc-500 text-xs uppercase font-bold mb-1">Power Level</div>
                    <div className="text-sm text-indigo-400 font-bold">{selectedLaptop.powerLevel}/10</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Game Playability on this Laptop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
              {games.map(game => {
                const perf = calculatePerformance(selectedLaptop, game);
                return { game, perf };
              }).sort((a, b) => b.perf.fps - a.perf.fps).map(({ game, perf }) => {
                const styles = getTagStyles(perf.tag);
                return (
                  <div key={game.id} className="bg-[#18181b]/50 border border-zinc-800/50 rounded-xl p-5 flex flex-col gap-4 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 shrink-0">
                        {game.iconInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white text-base truncate">{game.title}</h4>
                        <p className="text-xs text-zinc-500 truncate">{game.genre}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${styles.bg} ${styles.color} border-current/20 text-xs font-semibold`}>
                        {styles.icon}
                        {perf.tag}
                      </div>
                      <div className="text-zinc-400 text-sm font-medium">{perf.fps} FPS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <footer className="w-full py-6 border-t border-zinc-800 bg-[#09090b] text-center shrink-0">
        <p className="text-zinc-600 text-xs">Run It Up - Gaming Laptops Compatibility Checker</p>
      </footer>
    </div>
  );
}

export default App;
