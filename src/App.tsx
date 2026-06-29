import React, { useState } from 'react';
import { Sparkles, BarChart3, Search, Gamepad2, Laptop, Flame, Battery, Zap } from 'lucide-react';
import { games, laptops } from './data/mockData';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickFilters = ["Cyberpunk 2077", "Valorant", "GTA V", "Elden Ring"];

  const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()) || game.genre.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredLaptops = laptops.filter(laptop => laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) || laptop.gpu.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleItemClick = (type: string, name: string) => {
    alert(`Selected ${type}: ${name}`);
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "HIGH-END": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "MID-RANGE": return "text-teal-400 bg-teal-400/10 border-teal-400/20";
      case "BUDGET": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      default: return "text-zinc-400 bg-zinc-800 border-zinc-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans relative overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none fixed"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full shrink-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider">
          <span className="text-cyan-400">RUN</span>
          <span className="text-indigo-400">IT</span>
          <span className="text-white">UP</span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#18181b] p-1.5 rounded-full border border-zinc-800/50">
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-900/40 text-teal-400 rounded-full text-sm font-medium transition-colors">
            <Sparkles className="w-4 h-4" />
            Home
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white rounded-full text-sm font-medium transition-colors">
            <BarChart3 className="w-4 h-4" />
            Compare
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center pt-24 px-4 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
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

        {/* Search Section */}
        <div className="w-full max-w-2xl mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-teal-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-[#18181b]/80 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all backdrop-blur-sm shadow-xl"
            placeholder="Search games or laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Filters */}
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
              className="px-5 py-2 rounded-full border border-teal-900 bg-teal-900/20 text-teal-400 text-sm hover:text-teal-300 hover:border-teal-700 transition-all backdrop-blur-sm"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Browse Games Section */}
        <div className="w-full mt-12 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Gamepad2 className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">Browse Games</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGames.length > 0 ? filteredGames.map((game) => (
              <div 
                key={game.id} 
                onClick={() => handleItemClick("Game", game.title)}
                className="bg-[#18181b]/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-teal-500/30 transition-all cursor-pointer flex items-center p-4 gap-4"
              >
                 <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-sm font-bold border border-zinc-700 text-zinc-300 shadow-inner group-hover:from-teal-900/40 group-hover:to-teal-800/40 group-hover:text-teal-400 group-hover:border-teal-700/50 transition-colors">
                   {game.iconInitials}
                 </div>
                 <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate text-sm">{game.title}</h3>
                    <p className="text-zinc-500 text-xs mt-1 truncate">{game.genre}</p>
                 </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-zinc-500 py-10">No games found matching "{searchQuery}"</div>
            )}
          </div>
        </div>

        {/* Browse Laptops Section */}
        <div className="w-full mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Laptop className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Browse Laptops</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLaptops.length > 0 ? filteredLaptops.map((laptop) => (
              <div 
                key={laptop.id} 
                onClick={() => handleItemClick("Laptop", laptop.name)}
                className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-5 group hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col"
              >
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
                    <div className="flex items-center text-xs text-zinc-500">
                      <span className="w-16">GPU:</span>
                      <span className="text-zinc-300 font-medium">{laptop.gpu}</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-500">
                      <span className="w-16">CPU:</span>
                      <span className="text-zinc-300 font-medium">{laptop.cpu}</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-500">
                      <span className="w-16">RAM:</span>
                      <span className="text-zinc-300 font-medium">{laptop.ramStorage}</span>
                    </div>
                 </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-zinc-500 py-10">No laptops found matching "{searchQuery}"</div>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="w-full mb-32">
          <h2 className="text-2xl font-bold text-white mb-8">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Budget */}
            <div className="bg-[#18181b]/30 border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-orange-400">
                <Flame className="w-5 h-5" />
                <h3 className="font-bold text-sm">Best Budget Gaming</h3>
              </div>
              <div className="space-y-4">
                {[laptops.find(l=>l.id==="6"), laptops.find(l=>l.id==="7"), laptops.find(l=>l.id==="18")].map((l, idx) => l && (
                  <div key={l.id} className="flex gap-3 items-center group cursor-pointer" onClick={() => handleItemClick("Laptop", l.name)}>
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-orange-400/10 text-orange-400 text-xs font-bold shrink-0">#{idx+1}</div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-orange-400 transition-colors">{l.name}</h4>
                      <p className="text-xs text-zinc-500 truncate">{l.gpu} • ${l.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-[#18181b]/30 border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-purple-400">
                <Zap className="w-5 h-5" />
                <h3 className="font-bold text-sm">Best Performance</h3>
              </div>
              <div className="space-y-4">
                {[laptops.find(l=>l.id==="24"), laptops.find(l=>l.id==="25"), laptops.find(l=>l.id==="17")].map((l, idx) => l && (
                  <div key={l.id} className="flex gap-3 items-center group cursor-pointer" onClick={() => handleItemClick("Laptop", l.name)}>
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-400/10 text-purple-400 text-xs font-bold shrink-0">#{idx+1}</div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-purple-400 transition-colors">{l.name}</h4>
                      <p className="text-xs text-zinc-500 truncate">{l.gpu} • ${l.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battery Life */}
            <div className="bg-[#18181b]/30 border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-teal-400">
                <Battery className="w-5 h-5" />
                <h3 className="font-bold text-sm">Best Battery Life</h3>
              </div>
              <div className="space-y-4">
                {[laptops.find(l=>l.id==="2"), laptops.find(l=>l.id==="20"), laptops.find(l=>l.id==="4")].map((l, idx) => l && (
                  <div key={l.id} className="flex gap-3 items-center group cursor-pointer" onClick={() => handleItemClick("Laptop", l.name)}>
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-teal-400/10 text-teal-400 text-xs font-bold shrink-0">#{idx+1}</div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-teal-400 transition-colors">{l.name}</h4>
                      <p className="text-xs text-zinc-500 truncate">{l.gpu} • ${l.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-zinc-800 bg-[#09090b] text-center shrink-0">
        <p className="text-zinc-600 text-xs">Run It Up - Gaming Laptops Compatibility Checker</p>
      </footer>
    </div>
  );
}

export default App;
