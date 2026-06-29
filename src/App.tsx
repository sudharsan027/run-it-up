import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import GameDetailPage from './components/GameDetailPage';
import LaptopDetailPage from './components/LaptopDetailPage';
import { RawgGame } from './api/rawg';
import { Laptop } from './data/mockData';
import './index.css';

function App() {
  const [selectedGame, setSelectedGame] = useState<RawgGame | null>(null);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);

  const handleHome = () => {
    setSelectedGame(null);
    setSelectedLaptop(null);
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
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none fixed"></div>

      <Navbar onHome={handleHome} />

      <main className="relative z-10 flex-grow flex flex-col items-center pt-4 md:pt-12 px-4 w-full max-w-7xl mx-auto">
        {!selectedGame && !selectedLaptop && (
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
        <p className="text-zinc-600 text-xs">Run It Up - Realtime Gaming Laptops Compatibility Checker</p>
      </footer>
    </div>
  );
}

export default App;
