import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import GameDetailPage from './components/GameDetailPage';
import LaptopDetailPage from './components/LaptopDetailPage';
import ComparePage from './components/ComparePage';
import { RawgGame } from './api/rawg';
import { Laptop } from './data/mockData';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'compare'>('home');
  const [selectedGame, setSelectedGame] = useState<RawgGame | null>(null);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);

  const handleHome = () => {
    setActiveTab('home');
    setSelectedGame(null);
    setSelectedLaptop(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompare = () => {
    setActiveTab('compare');
    setSelectedGame(null);
    setSelectedLaptop(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: RawgGame) => {
    setSelectedLaptop(null);
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLaptop = (laptop: Laptop) => {
    setSelectedGame(null);
    setSelectedLaptop(laptop);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans relative overflow-x-hidden flex flex-col">
      {/* Background Grid & Fixed Emblem Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none fixed"></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <img src="/favicon.svg" alt="" className="w-[800px] h-[800px] max-w-none transform -rotate-12 scale-125" />
      </div>

      <Navbar activeTab={activeTab} onHome={handleHome} onCompare={handleCompare} />

      <main className="relative z-10 flex-grow flex flex-col items-center pt-4 md:pt-12 px-4 w-full max-w-7xl mx-auto">
        {activeTab === 'compare' && !selectedGame && !selectedLaptop && (
          <ComparePage />
        )}

        {activeTab === 'home' && !selectedGame && !selectedLaptop && (
          <HomePage onSelectGame={handleSelectGame} onSelectLaptop={handleSelectLaptop} />
        )}

        {selectedGame && (
          <GameDetailPage game={selectedGame} onBack={handleHome} onSelectLaptop={handleSelectLaptop} />
        )}

        {selectedLaptop && (
          <LaptopDetailPage laptop={selectedLaptop} onBack={handleHome} onSelectGame={handleSelectGame} />
        )}
      </main>

      <footer className="w-full py-6 border-t border-zinc-800 bg-[#09090b] text-center shrink-0 relative z-10 mt-20">
        <p className="text-zinc-600 text-xs">Run It Up - Realtime Gaming Laptop Compatibility Checker</p>
      </footer>
    </div>
  );
}

export default App;
