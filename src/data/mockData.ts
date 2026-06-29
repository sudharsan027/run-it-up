import { getGPUPowerFromText, estimateDemandLevel } from '../api/rawg';
import type { RawgGame } from '../api/rawg';

export interface Laptop {
  id: string;
  name: string;
  price: number;
  tier: "HIGH-END" | "MID-RANGE" | "BUDGET" | "ENTHUSIAST";
  gpu: string;
  cpu: string;
  ram: string;
  storage: string;
}

export interface PerformanceResult {
  tag: "Ultra" | "High" | "Medium" | "Low Settings" | "Not Playable";
  fps: number;
  battery: string;
  resolution: string;
  score: number;
}

export function getLaptopPower(gpu: string): number {
  return getGPUPowerFromText(gpu);
}

export function getGameDemand(game: RawgGame, recReqText?: string): number {
  if (recReqText) {
    const parsed = getGPUPowerFromText(recReqText);
    if (parsed > 1) return parsed;
  }
  return estimateDemandLevel(game.metacritic, game.released);
}

export function calculatePerformance(laptopGPU: string, gameDemand: number): PerformanceResult {
  const power = getLaptopPower(laptopGPU);
  const diff = power - gameDemand;
  let tag: PerformanceResult["tag"] = "Not Playable";
  let fps = 0;
  let resolution = "720p";
  let battery = "3h";

  if (diff >= 2.5) {
    tag = "Ultra"; fps = Math.min(144, 90 + Math.round(diff * 6)); resolution = "4K"; battery = "1h";
  } else if (diff >= 0.5) {
    tag = "High"; fps = Math.min(144, 70 + Math.round(diff * 8)); resolution = "1440p"; battery = "1.2h";
  } else if (diff >= -1.5) {
    tag = "Medium"; fps = Math.max(45, 55 + Math.round(diff * 8)); resolution = "1440p"; battery = "1.5h";
  } else if (diff >= -4) {
    tag = "Low Settings"; fps = Math.max(25, 38 + Math.round(diff * 5)); resolution = "1080p"; battery = "2h";
  } else {
    tag = "Not Playable"; fps = Math.max(5, 15 + Math.round(diff * 2)); resolution = "720p"; battery = "2.5h";
  }

  return { tag, fps, resolution, battery, score: power - gameDemand };
}

export interface ComparisonMetrics {
  lowFps: number;
  medFps: number;
  highFps: number;
  ultraFps: number;
  batteryGaming: string;
  maxResolution: string;
  cpuUsage: number;
  gpuUsage: number;
  fpsHigh: number;
}

export function calculateDetailedComparison(laptop: Laptop, gameDemand: number): ComparisonMetrics {
  const power = getLaptopPower(laptop.gpu);
  const diff = power - gameDemand;
  
  const highFps = Math.max(15, Math.min(144, Math.round(60 + diff * 7)));
  const lowFps = Math.min(165, Math.round(highFps * 1.55));
  const medFps = Math.min(144, Math.round(highFps * 1.25));
  const ultraFps = Math.max(10, Math.round(highFps * 0.82));

  let maxResolution = "1080p";
  if (power >= 8.5) maxResolution = "4K";
  else if (power >= 6.5) maxResolution = "1440p";

  let batteryGaming = "1.8h";
  if (laptop.tier === "ENTHUSIAST") batteryGaming = "1.2h";
  else if (laptop.tier === "HIGH-END") batteryGaming = "1.6h";
  else if (laptop.tier === "MID-RANGE") batteryGaming = "1.9h";
  else batteryGaming = "2.3h";

  const cpuUsage = Math.max(45, Math.min(98, Math.round(85 - (power * 2.5) + (gameDemand * 3))));
  const gpuUsage = Math.max(60, Math.min(99, Math.round(95 - (diff * 4))));

  return {
    lowFps,
    medFps,
    highFps,
    ultraFps,
    batteryGaming,
    maxResolution,
    cpuUsage,
    gpuUsage,
    fpsHigh: highFps
  };
}


export const laptops: Laptop[] = [
  // ENTHUSIAST TIER
  { id: "e1", name: "MSI Raider GE78 HX", price: 3499, tier: "ENTHUSIAST", gpu: "RTX 4090", cpu: "Intel i9-13980HX", ram: "64GB DDR5", storage: "4TB NVMe" },
  { id: "e2", name: "Razer Blade 18", price: 4299, tier: "ENTHUSIAST", gpu: "RTX 4090", cpu: "Intel i9-14900HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "e3", name: "Razer Blade 16", price: 3499, tier: "ENTHUSIAST", gpu: "RTX 4090", cpu: "Intel i9-13950HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "e4", name: "ASUS ROG Strix SCAR 18", price: 3999, tier: "ENTHUSIAST", gpu: "RTX 4090", cpu: "Intel i9-14900HX", ram: "64GB DDR5", storage: "4TB NVMe" },
  { id: "e5", name: "ASUS ROG Strix SCAR 16", price: 3599, tier: "ENTHUSIAST", gpu: "RTX 4080", cpu: "AMD Ryzen 9 7945HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "e6", name: "MSI GT76 Titan", price: 3299, tier: "ENTHUSIAST", gpu: "RTX 4080", cpu: "Intel i9-13980HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "e7", name: "Custom PC Ultra Gaming", price: 3000, tier: "ENTHUSIAST", gpu: "RTX 4090", cpu: "Intel i9-13900K", ram: "64GB DDR5", storage: "4TB NVMe" },
  { id: "e8", name: "Custom PC AMD Enthusiast", price: 2800, tier: "ENTHUSIAST", gpu: "RX 7900 XTX", cpu: "AMD Ryzen 9 7950X", ram: "64GB DDR5", storage: "2TB NVMe" },
  // HIGH-END
  { id: "h1", name: "ASUS ROG Strix G16", price: 2199, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i9-13980HX", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "h2", name: "ASUS ROG Zephyrus G14", price: 1599, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 9 7940HS", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "h3", name: "ASUS ROG Zephyrus G16", price: 2499, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel Ultra 9 185H", ram: "32GB DDR5", storage: "1TB NVMe" },
  { id: "h4", name: "Lenovo Legion 7i", price: 2500, tier: "HIGH-END", gpu: "RTX 4080", cpu: "Intel i9-13900HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h5", name: "Lenovo Legion 5 Pro", price: 1499, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "h6", name: "Lenovo Legion 9i", price: 3999, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-13980HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h7", name: "HP OMEN 16", price: 1299, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7840HS", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "h8", name: "HP OMEN 17", price: 2100, tier: "HIGH-END", gpu: "RTX 4080", cpu: "Intel i7-13700HX", ram: "32GB DDR5", storage: "1TB NVMe" },
  { id: "h9", name: "HP OMEN Transcend 16", price: 2499, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel Ultra 7 155H", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h10", name: "Dell Alienware m16 R2", price: 1799, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel Ultra 9 185H", ram: "32GB DDR5", storage: "1TB NVMe" },
  { id: "h11", name: "Dell Alienware x16", price: 2999, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-13980HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h12", name: "Acer Predator Helios 18", price: 2299, tier: "HIGH-END", gpu: "RTX 4080", cpu: "Intel i9-14900HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h13", name: "Acer Predator Helios 16", price: 1450, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i7-13700HX", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "h14", name: "MSI Titan GT77", price: 3999, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-12900HX", ram: "64GB DDR5", storage: "4TB NVMe" },
  { id: "h15", name: "Razer Blade 14", price: 2399, tier: "HIGH-END", gpu: "RTX 4070", cpu: "AMD Ryzen 9 7940HS", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "h16", name: "Samsung Galaxy Book4 Ultra", price: 2499, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel Ultra 9 185H", ram: "32GB LPDDR5", storage: "1TB NVMe" },
  { id: "h17", name: "ASUS ProArt Studiobook 16", price: 2799, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i9-13980HX", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h18", name: "Custom PC High-End Gaming", price: 1500, tier: "HIGH-END", gpu: "RTX 4070 Ti", cpu: "Intel i7-13700K", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h19", name: "Custom PC AMD High-End", price: 1800, tier: "HIGH-END", gpu: "RX 7900 XT", cpu: "AMD Ryzen 9 7900X", ram: "32GB DDR5", storage: "2TB NVMe" },
  { id: "h20", name: "Lenovo ThinkPad X1 Extreme Gen5", price: 2699, tier: "HIGH-END", gpu: "RTX 3080 Ti", cpu: "Intel i9-12900H", ram: "32GB DDR5", storage: "2TB NVMe" },
  // MID-RANGE
  { id: "m1", name: "ASUS TUF Gaming F15", price: 1100, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "Intel i7-12700H", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m2", name: "ASUS TUF Gaming A15", price: 999, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m3", name: "ASUS ROG Strix G15", price: 1299, tier: "MID-RANGE", gpu: "RTX 3060", cpu: "AMD Ryzen 7 6800H", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m4", name: "Lenovo Legion 5", price: 1099, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m5", name: "Lenovo Legion Slim 5", price: 1199, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7840HS", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m6", name: "HP OMEN 16 AMD", price: 1199, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7840HS", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m7", name: "Dell G16 7630", price: 1299, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-13650HX", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m8", name: "Dell G15 5530", price: 999, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "Intel i5-13450HX", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m9", name: "Dell Alienware m15 R7", price: 1599, tier: "MID-RANGE", gpu: "RTX 3070 Ti", cpu: "Intel i7-12700H", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m10", name: "Acer Nitro 5", price: 849, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "AMD Ryzen 5 7535HS", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m11", name: "Acer Nitro 16", price: 999, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m12", name: "MSI Katana 15", price: 1099, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-12650H", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m13", name: "MSI Cyborg 15", price: 899, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-13620H", ram: "16GB DDR5", storage: "512GB NVMe" },
  { id: "m14", name: "MSI Pulse 15", price: 1099, tier: "MID-RANGE", gpu: "RTX 4070", cpu: "Intel i7-13700H", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m15", name: "Gigabyte Aorus 16", price: 1299, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-13700H", ram: "16GB DDR5", storage: "1TB NVMe" },
  { id: "m16", name: "Custom PC Mid-Range Gaming", price: 800, tier: "MID-RANGE", gpu: "RTX 3060", cpu: "AMD Ryzen 5 5600X", ram: "16GB DDR4", storage: "1TB NVMe" },
  { id: "m17", name: "Custom PC Intel Mid-Range", price: 950, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i5-13600K", ram: "32GB DDR5", storage: "1TB NVMe" },
  { id: "m18", name: "HP Victus 16", price: 949, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-13700H", ram: "16GB DDR5", storage: "512GB NVMe" },
  // BUDGET
  { id: "b1", name: "Lenovo IdeaPad Gaming 3", price: 850, tier: "BUDGET", gpu: "RTX 3050", cpu: "AMD Ryzen 5 5600H", ram: "8GB DDR4", storage: "256GB NVMe" },
  { id: "b2", name: "HP Victus 15", price: 699, tier: "BUDGET", gpu: "GTX 1650", cpu: "Intel i5-12500H", ram: "8GB DDR4", storage: "512GB NVMe" },
  { id: "b3", name: "Dell G15 5520", price: 749, tier: "BUDGET", gpu: "RTX 3050", cpu: "Intel i5-12500H", ram: "8GB DDR4", storage: "256GB NVMe" },
  { id: "b4", name: "Acer Aspire 7", price: 549, tier: "BUDGET", gpu: "GTX 1650", cpu: "AMD Ryzen 5 5500U", ram: "8GB DDR4", storage: "512GB NVMe" },
  { id: "b5", name: "Acer Nitro V 15", price: 749, tier: "BUDGET", gpu: "RTX 4050", cpu: "Intel i5-13420H", ram: "8GB DDR5", storage: "512GB NVMe" },
  { id: "b6", name: "MSI Thin GF63", price: 599, tier: "BUDGET", gpu: "RTX 2050", cpu: "Intel i5-12450H", ram: "8GB DDR4", storage: "512GB NVMe" },
  { id: "b7", name: "ASUS TUF Gaming FX505", price: 679, tier: "BUDGET", gpu: "GTX 1650", cpu: "AMD Ryzen 5 3550H", ram: "8GB DDR4", storage: "512GB NVMe" },
  { id: "b8", name: "Lenovo IdeaPad Gaming 3i", price: 729, tier: "BUDGET", gpu: "RTX 3050 Ti", cpu: "Intel i5-12450H", ram: "8GB DDR4", storage: "512GB NVMe" },
  { id: "b9", name: "HP Gaming Laptop 15", price: 599, tier: "BUDGET", gpu: "GTX 1650 Ti", cpu: "AMD Ryzen 5 5600H", ram: "8GB DDR4", storage: "256GB NVMe" },
  { id: "b10", name: "Custom PC Budget Gaming", price: 420, tier: "BUDGET", gpu: "GTX 1650", cpu: "Intel i3-12100F", ram: "8GB DDR4", storage: "500GB SSD" },
  { id: "b11", name: "Custom PC AMD Budget", price: 520, tier: "BUDGET", gpu: "RX 6600", cpu: "AMD Ryzen 5 5500", ram: "16GB DDR4", storage: "500GB SSD" },
];
