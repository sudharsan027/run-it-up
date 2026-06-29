import React from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';

interface NavbarProps {
  onHome: () => void;
}

export default function Navbar({ onHome }: NavbarProps) {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto shrink-0">
      <div className="flex items-center gap-2 font-bold text-xl tracking-wider cursor-pointer" onClick={onHome}>
        <span className="text-cyan-400">RUN</span>
        <span className="text-indigo-400">IT</span>
        <span className="text-white">UP</span>
      </div>
      <div className="flex items-center gap-2 bg-[#18181b] p-1.5 rounded-full border border-zinc-800/50">
        <button onClick={onHome} className="flex items-center gap-2 px-4 py-2 bg-teal-900/40 text-teal-400 rounded-full text-sm font-medium transition-colors">
          <Sparkles className="w-4 h-4" /> Home
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white rounded-full text-sm font-medium transition-colors">
          <BarChart3 className="w-4 h-4" /> Compare
        </button>
      </div>
    </nav>
  );
}
