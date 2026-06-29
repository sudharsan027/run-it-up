import React, { useState, useEffect } from 'react';
import { fetchGames, RawgGame } from '../api/rawg';
import { laptops, calculateDetailedComparison, getGameDemand, Laptop } from '../data/mockData';

export default function ComparePage() {
  const [gamesList, setGamesList] = useState<Array<{ id: string | number; title: string; demand: number }>>([
    { id: "1", title: "Cyberpunk 2077", demand: 9 },
    { id: "2", title: "GTA V", demand: 4 },
    { id: "3", title: "Valorant", demand: 2 },
    { id: "4", title: "Elden Ring", demand: 8 },
    { id: "5", title: "Fortnite", demand: 5 },
    { id: "6", title: "Hogwarts Legacy", demand: 9 }
  ]);
  
  const [selectedGameTitle, setSelectedGameTitle] = useState("Cyberpunk 2077");
  const [selectedLaptop1Id, setSelectedLaptop1Id] = useState<string>("h1"); // ASUS ROG Strix G16
  const [selectedLaptop2Id, setSelectedLaptop2Id] = useState<string>("h2"); // ASUS ROG Zephyrus G14

  useEffect(() => {
    fetchGames('', 1).then(data => {
      if (data && data.results && data.results.length > 0) {
        const rawgGames = data.results.map(g => ({
          id: g.id,
          title: g.name,
          demand: getGameDemand(g)
        }));
        setGamesList(rawgGames);
      }
    }).catch(() => {});
  }, []);

  const currentGame = gamesList.find(g => g.title === selectedGameTitle) || gamesList[0];
  const laptop1 = laptops.find(l => l.id === selectedLaptop1Id) || laptops[0];
  const laptop2 = laptops.find(l => l.id === selectedLaptop2Id) || laptops[1] || laptops[0];

  const metrics1 = calculateDetailedComparison(laptop1, currentGame ? currentGame.demand : 8);
  const metrics2 = calculateDetailedComparison(laptop2, currentGame ? currentGame.demand : 8);

  const presets = [
    { name: "Low", l1: metrics1.lowFps, l2: metrics2.lowFps },
    { name: "Medium", l1: metrics1.medFps, l2: metrics2.medFps },
    { name: "High", l1: metrics1.highFps, l2: metrics2.highFps },
    { name: "Ultra", l1: metrics1.ultraFps, l2: metrics2.ultraFps }
  ];

  const maxFpsInChart = Math.max(120, ...presets.flatMap(p => [p.l1, p.l2]));

  const getShortName = (fullName: string) => {
    return fullName.replace(/Custom PC /i, '').replace(/ASUS /i, '').replace(/Lenovo /i, '').replace(/HP /i, '').replace(/Dell /i, '');
  };

  return (
    <div className="w-full pb-20">
      <h1 className="text-3xl font-bold text-white mb-8">Compare Laptops</h1>

      {/* Selectors Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2">Game</label>
          <select 
            value={selectedGameTitle} 
            onChange={e => setSelectedGameTitle(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
          >
            {gamesList.map(g => (
              <option key={g.id} value={g.title} className="bg-[#18181b] text-white">{g.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2">Laptop 1</label>
          <select 
            value={selectedLaptop1Id} 
            onChange={e => setSelectedLaptop1Id(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
          >
            {laptops.map(l => (
              <option key={l.id} value={l.id} className="bg-[#18181b] text-white">{l.name} (${l.price})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2">Laptop 2</label>
          <select 
            value={selectedLaptop2Id} 
            onChange={e => setSelectedLaptop2Id(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
          >
            {laptops.map(l => (
              <option key={l.id} value={l.id} className="bg-[#18181b] text-white">{l.name} (${l.price})</option>
            ))}
          </select>
        </div>
      </div>

      {/* FPS Comparison Chart Card */}
      <div className="bg-[#18181b]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-8">FPS Comparison — {currentGame.title}</h2>

        <div className="relative h-64 w-full flex items-end pt-6 pb-8 px-4 border-b border-zinc-800/80">
          {/* Y-Axis lines and markers */}
          <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none text-zinc-600 text-[10px]">
            <div className="border-b border-zinc-800/50 w-full flex items-center"><span className="-mt-3 bg-[#18181b] pr-2">{Math.round(maxFpsInChart)}</span></div>
            <div className="border-b border-zinc-800/50 w-full flex items-center"><span className="-mt-3 bg-[#18181b] pr-2">{Math.round(maxFpsInChart * 0.75)}</span></div>
            <div className="border-b border-zinc-800/50 w-full flex items-center"><span className="-mt-3 bg-[#18181b] pr-2">{Math.round(maxFpsInChart * 0.5)}</span></div>
            <div className="border-b border-zinc-800/50 w-full flex items-center"><span className="-mt-3 bg-[#18181b] pr-2">{Math.round(maxFpsInChart * 0.25)}</span></div>
            <div className="border-b border-zinc-800/50 w-full flex items-center"><span className="-mt-3 bg-[#18181b] pr-2">0</span></div>
          </div>

          {/* Bars */}
          <div className="w-full h-full flex justify-around items-end pl-8 relative z-10">
            {presets.map(p => {
              const h1 = Math.max(4, (p.l1 / maxFpsInChart) * 100);
              const h2 = Math.max(4, (p.l2 / maxFpsInChart) * 100);
              return (
                <div key={p.name} className="flex flex-col items-center h-full justify-end group">
                  <div className="flex items-end gap-1.5 h-full">
                    {/* Bar 1 Cyan */}
                    <div 
                      style={{ height: `${h1}%` }} 
                      className="w-8 md:w-12 bg-cyan-400 rounded-t-sm transition-all duration-500 relative flex justify-center group-hover:brightness-110"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-cyan-400 bg-zinc-900 px-1 rounded transition-opacity">{p.l1}</span>
                    </div>
                    {/* Bar 2 Purple */}
                    <div 
                      style={{ height: `${h2}%` }} 
                      className="w-8 md:w-12 bg-purple-500 rounded-t-sm transition-all duration-500 relative flex justify-center group-hover:brightness-110"
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-purple-400 bg-zinc-900 px-1 rounded transition-opacity">{p.l2}</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium mt-3">{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400 rounded-sm inline-block"></span>
            <span className="text-cyan-400">{getShortName(laptop1.name)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block"></span>
            <span className="text-purple-400">{getShortName(laptop2.name)}</span>
          </div>
        </div>
      </div>

      {/* Side by Side Specs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Laptop 1 Card */}
        <div className="bg-[#18181b]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-white text-base mb-6">{laptop1.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">PRICE</div>
              <div className="text-lg font-bold text-white">${laptop1.price}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">BATTERY (GAMING)</div>
              <div className="text-lg font-bold text-white">{metrics1.batteryGaming}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">MAX RESOLUTION</div>
              <div className="text-lg font-bold text-white">{metrics1.maxResolution}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">CPU USAGE</div>
              <div className="text-lg font-bold text-white">{metrics1.cpuUsage}%</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">GPU USAGE</div>
              <div className="text-lg font-bold text-white">{metrics1.gpuUsage}%</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">FPS (HIGH)</div>
              <div className="text-lg font-bold text-cyan-400">{metrics1.fpsHigh}</div>
            </div>
          </div>
        </div>

        {/* Laptop 2 Card */}
        <div className="bg-[#18181b]/90 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-white text-base mb-6">{laptop2.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">PRICE</div>
              <div className="text-lg font-bold text-white">${laptop2.price}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">BATTERY (GAMING)</div>
              <div className="text-lg font-bold text-white">{metrics2.batteryGaming}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">MAX RESOLUTION</div>
              <div className="text-lg font-bold text-white">{metrics2.maxResolution}</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">CPU USAGE</div>
              <div className="text-lg font-bold text-white">{metrics2.cpuUsage}%</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">GPU USAGE</div>
              <div className="text-lg font-bold text-white">{metrics2.gpuUsage}%</div>
            </div>
            <div className="bg-[#09090b]/60 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">FPS (HIGH)</div>
              <div className="text-lg font-bold text-purple-400">{metrics2.fpsHigh}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
