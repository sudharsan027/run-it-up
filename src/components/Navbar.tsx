import React from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'compare';
  onHome: () => void;
  onCompare: () => void;
}

export default function Navbar({ activeTab, onHome, onCompare }: NavbarProps) {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto shrink-0">
      <div className="flex items-center gap-2 font-bold text-xl tracking-wider cursor-pointer" onClick={onHome}>
        <span className="text-cyan-400">RUN</span>
        <span className="text-indigo-400">IT</span>
        <span className="text-white">UP</span>
      </div>
      <div className="flex items-center gap-2 bg-[#121215] p-1.5 rounded-full border border-zinc-800/80 shadow-inner">
        <button 
          onClick={onHome} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'home' 
              ? 'bg-teal-950/60 text-teal-400 border border-teal-500/30 shadow' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Home
        </button>
        <button 
          onClick={onCompare} 
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'compare' 
              ? 'bg-teal-950/60 text-teal-400 border border-teal-500/30 shadow' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Compare
        </button>
      </div>
    </nav>
  );
}
