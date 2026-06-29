import React, { useState } from 'react';
import { Sparkles, BarChart3, Search, Gamepad2 } from 'lucide-react';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickFilters = ["Cyberpunk 2077", "Valorant", "GTA V", "Elden Ring"];

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
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
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 px-4 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
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
        <div className="flex flex-wrap items-center justify-center gap-3 mb-24">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              className="px-5 py-2 rounded-full border border-zinc-800 bg-[#09090b]/50 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all backdrop-blur-sm"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Browse Games Section Placeholder */}
        <div className="w-full mt-12 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Gamepad2 className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">Browse Games</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Placeholder cards for games */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video bg-[#18181b]/50 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-teal-500/30 transition-all cursor-pointer relative flex flex-col justify-end p-4">
                 <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs border border-zinc-700 text-zinc-400 group-hover:bg-teal-900/40 group-hover:text-teal-400 transition-colors">
                   {i}
                 </div>
                 <div className="w-full h-2 rounded bg-zinc-800/50 mb-2 group-hover:bg-zinc-700 transition-colors"></div>
                 <div className="w-2/3 h-2 rounded bg-zinc-800/50 group-hover:bg-zinc-700 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
