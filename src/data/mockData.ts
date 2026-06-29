export interface Game {
  id: string;
  title: string;
  genre: string;
  releaseYear: string;
  iconInitials: string;
  demandLevel: number; // 1 (low) to 10 (high)
  minReq: { cpu: string; gpu: string; ram: string; storage: string };
  recReq: { cpu: string; gpu: string; ram: string; storage: string };
}

export interface Laptop {
  id: string;
  name: string;
  price: number;
  tier: "HIGH-END" | "MID-RANGE" | "BUDGET";
  powerLevel: number; // 1 (low) to 10 (high)
  gpu: string;
  cpu: string;
  ramStorage: string;
}

export interface PerformanceResult {
  tag: "Ultra" | "High" | "Medium" | "Low Settings" | "Not Playable";
  fps: number;
  battery: string;
  resolution: string;
}

export const games: Game[] = [
  { 
    id: "1", title: "Cyberpunk 2077", genre: "RPG", releaseYear: "2020", iconInitials: "CP", demandLevel: 9,
    minReq: { cpu: "Intel Core i7-6700", gpu: "GTX 1060", ram: "8 GB", storage: "70 GB SSD" },
    recReq: { cpu: "Intel Core i7-12700", gpu: "RTX 2060", ram: "16 GB", storage: "70 GB SSD" }
  },
  { 
    id: "2", title: "GTA V", genre: "Action", releaseYear: "2013", iconInitials: "GT", demandLevel: 4,
    minReq: { cpu: "Intel Core 2 Quad CPU Q6600", gpu: "9800 GT", ram: "4 GB", storage: "72 GB" },
    recReq: { cpu: "Intel Core i5 3470", gpu: "GTX 660", ram: "8 GB", storage: "72 GB" }
  },
  { 
    id: "3", title: "Valorant", genre: "FPS", releaseYear: "2020", iconInitials: "VL", demandLevel: 2,
    minReq: { cpu: "Intel Core 2 Duo E8400", gpu: "Intel HD 4000", ram: "4 GB", storage: "20 GB" },
    recReq: { cpu: "Intel i3-4150", gpu: "GT 730", ram: "4 GB", storage: "20 GB" }
  },
  { 
    id: "4", title: "Elden Ring", genre: "RPG", releaseYear: "2022", iconInitials: "ER", demandLevel: 8,
    minReq: { cpu: "Intel Core i5-8400", gpu: "GTX 1060", ram: "12 GB", storage: "60 GB" },
    recReq: { cpu: "Intel Core i7-8700K", gpu: "GTX 1070", ram: "16 GB", storage: "60 GB" }
  },
  { 
    id: "5", title: "Fortnite", genre: "Battle Royale", releaseYear: "2017", iconInitials: "FN", demandLevel: 5,
    minReq: { cpu: "Core i3-3225", gpu: "Intel HD 4000", ram: "8 GB", storage: "30 GB" },
    recReq: { cpu: "Core i5-7300U", gpu: "GTX 960", ram: "8 GB", storage: "30 GB" }
  },
  { 
    id: "6", title: "Hogwarts Legacy", genre: "RPG", releaseYear: "2023", iconInitials: "HL", demandLevel: 9,
    minReq: { cpu: "Intel Core i5-6600", gpu: "GTX 960", ram: "16 GB", storage: "85 GB" },
    recReq: { cpu: "Intel Core i7-8700", gpu: "GTX 1080 Ti", ram: "16 GB", storage: "85 GB" }
  },
  { 
    id: "7", title: "Minecraft", genre: "Sandbox", releaseYear: "2011", iconInitials: "MC", demandLevel: 2,
    minReq: { cpu: "Intel Core i3-3210", gpu: "Intel HD Graphics 4000", ram: "4 GB", storage: "1 GB" },
    recReq: { cpu: "Intel Core i5-4690", gpu: "GTX 750", ram: "8 GB", storage: "4 GB" }
  },
  { id: "8", title: "Red Dead Redemption 2", genre: "Action", releaseYear: "2018", iconInitials: "RD", demandLevel: 8, minReq: { cpu: "Intel Core i5-2500K", gpu: "GTX 770", ram: "8 GB", storage: "150 GB" }, recReq: { cpu: "Intel Core i7-4770K", gpu: "GTX 1060", ram: "12 GB", storage: "150 GB" } },
  { id: "9", title: "Call of Duty: Warzone", genre: "FPS", releaseYear: "2020", iconInitials: "CW", demandLevel: 7, minReq: { cpu: "Intel Core i3-4340", gpu: "GTX 670", ram: "8 GB", storage: "175 GB" }, recReq: { cpu: "Intel Core i5-2500K", gpu: "GTX 970", ram: "12 GB", storage: "175 GB" } },
  { id: "10", title: "Apex Legends", genre: "Battle Royale", releaseYear: "2019", iconInitials: "AL", demandLevel: 5, minReq: { cpu: "Intel Core i3-6300", gpu: "GT 640", ram: "6 GB", storage: "56 GB" }, recReq: { cpu: "Intel i5 3570K", gpu: "GTX 970", ram: "8 GB", storage: "56 GB" } },
  { id: "11", title: "The Witcher 3", genre: "RPG", releaseYear: "2015", iconInitials: "W3", demandLevel: 6, minReq: { cpu: "Intel Core i5-2500K", gpu: "GTX 660", ram: "6 GB", storage: "35 GB" }, recReq: { cpu: "Intel Core i7 3770", gpu: "GTX 770", ram: "8 GB", storage: "35 GB" } },
  { id: "12", title: "God of War Ragnarok", genre: "Action RPG", releaseYear: "2024", iconInitials: "GW", demandLevel: 9, minReq: { cpu: "Intel Core i5-4670K", gpu: "GTX 1060", ram: "8 GB", storage: "190 GB" }, recReq: { cpu: "Intel Core i5-11600K", gpu: "RTX 2070", ram: "16 GB", storage: "190 GB" } },
  { id: "13", title: "EA Sports FC 24", genre: "Sports", releaseYear: "2023", iconInitials: "FC", demandLevel: 5, minReq: { cpu: "Intel Core i5-6600K", gpu: "GTX 1050 Ti", ram: "8 GB", storage: "100 GB" }, recReq: { cpu: "Intel Core i7-6700", gpu: "GTX 1660", ram: "12 GB", storage: "100 GB" } },
  { id: "14", title: "League of Legends", genre: "MOBA", releaseYear: "2009", iconInitials: "LL", demandLevel: 1, minReq: { cpu: "Intel Core i3-530", gpu: "HD 4600", ram: "2 GB", storage: "16 GB" }, recReq: { cpu: "Intel Core i5-3300", gpu: "GTX 560", ram: "4 GB", storage: "16 GB" } },
  { id: "15", title: "Spider-Man Remastered", genre: "Action", releaseYear: "2022", iconInitials: "SM", demandLevel: 7, minReq: { cpu: "Intel Core i3-4160", gpu: "GTX 950", ram: "8 GB", storage: "75 GB" }, recReq: { cpu: "Intel Core i5-4670", gpu: "GTX 1060", ram: "16 GB", storage: "75 GB" } },
  { id: "16", title: "Resident Evil 4 Remake", genre: "Horror", releaseYear: "2023", iconInitials: "RE", demandLevel: 8, minReq: { cpu: "AMD Ryzen 3 1200", gpu: "Radeon RX 560", ram: "8 GB", storage: "73 GB" }, recReq: { cpu: "Intel Core i7 8700", gpu: "GTX 1070", ram: "16 GB", storage: "73 GB" } },
  { id: "17", title: "Starfield", genre: "RPG", releaseYear: "2023", iconInitials: "SF", demandLevel: 10, minReq: { cpu: "Intel Core i7-6800K", gpu: "GTX 1070 Ti", ram: "16 GB", storage: "125 GB SSD" }, recReq: { cpu: "Intel Core i5-10600K", gpu: "RTX 2080", ram: "16 GB", storage: "125 GB SSD" } },
  { id: "18", title: "Counter-Strike 2", genre: "FPS", releaseYear: "2023", iconInitials: "CS", demandLevel: 3, minReq: { cpu: "Intel Core i5 750", gpu: "1GB GPU", ram: "8 GB", storage: "85 GB" }, recReq: { cpu: "Intel Core i5-6600K", gpu: "GTX 1060", ram: "16 GB", storage: "85 GB" } },
  { id: "19", title: "Baldur's Gate 3", genre: "RPG", releaseYear: "2023", iconInitials: "BG", demandLevel: 8, minReq: { cpu: "Intel I5 4690", gpu: "GTX 970", ram: "8 GB", storage: "150 GB" }, recReq: { cpu: "Intel i7 8700K", gpu: "RTX 2060", ram: "16 GB", storage: "150 GB" } },
  { id: "20", title: "Diablo IV", genre: "Action RPG", releaseYear: "2023", iconInitials: "D4", demandLevel: 6, minReq: { cpu: "Intel Core i5-2500K", gpu: "GTX 660", ram: "8 GB", storage: "90 GB" }, recReq: { cpu: "Intel Core i5-4670K", gpu: "GTX 970", ram: "16 GB", storage: "90 GB" } },
  { id: "21", title: "Horizon Forbidden West", genre: "Action RPG", releaseYear: "2024", iconInitials: "HZ", demandLevel: 9, minReq: { cpu: "Intel Core i3-8100", gpu: "GTX 1650", ram: "16 GB", storage: "150 GB" }, recReq: { cpu: "Intel Core i5-8600", gpu: "RTX 3060", ram: "16 GB", storage: "150 GB" } },
  { id: "22", title: "Helldivers 2", genre: "Shooter", releaseYear: "2024", iconInitials: "HD", demandLevel: 8, minReq: { cpu: "Intel Core i7-4790K", gpu: "GTX 1050 Ti", ram: "8 GB", storage: "100 GB" }, recReq: { cpu: "Intel Core i7-9700K", gpu: "RTX 2060", ram: "16 GB", storage: "100 GB" } },
  { id: "23", title: "Palworld", genre: "Survival", releaseYear: "2024", iconInitials: "PW", demandLevel: 7, minReq: { cpu: "i5-3570K", gpu: "GTX 1050", ram: "16 GB", storage: "40 GB" }, recReq: { cpu: "i9-9900K", gpu: "RTX 2070", ram: "32 GB", storage: "40 GB" } },
  { id: "24", title: "Alan Wake 2", genre: "Horror", releaseYear: "2023", iconInitials: "AW", demandLevel: 10, minReq: { cpu: "Intel i5-7600K", gpu: "RTX 2060", ram: "16 GB", storage: "90 GB" }, recReq: { cpu: "Ryzen 7 3700X", gpu: "RTX 3070", ram: "16 GB", storage: "90 GB" } }
];

export const laptops: Laptop[] = [
  { id: "1", name: "ASUS ROG Strix G16", price: 2199, tier: "HIGH-END", powerLevel: 9, gpu: "RTX 4070", cpu: "Intel i9-13980HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "2", name: "ASUS ROG Zephyrus G14", price: 1599, tier: "HIGH-END", powerLevel: 8, gpu: "RTX 4060", cpu: "AMD Ryzen 9 7940HS", ramStorage: "16GB RAM - 512GB" },
  { id: "3", name: "ASUS TUF Gaming F15", price: 1100, tier: "MID-RANGE", powerLevel: 5, gpu: "RTX 4050", cpu: "Intel i7-12700H", ramStorage: "16GB RAM - 512GB" },
  { id: "4", name: "Lenovo Legion 5 Pro", price: 1499, tier: "HIGH-END", powerLevel: 8, gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ramStorage: "16GB RAM - 512GB" },
  { id: "5", name: "Lenovo Legion 7i", price: 2500, tier: "HIGH-END", powerLevel: 10, gpu: "RTX 4080", cpu: "Intel i9-13900HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "6", name: "Lenovo IdeaPad Gaming 3", price: 850, tier: "BUDGET", powerLevel: 3, gpu: "RTX 3050", cpu: "AMD Ryzen 5 5600H", ramStorage: "8GB RAM - 256GB" },
  { id: "7", name: "HP Victus 15", price: 699, tier: "BUDGET", powerLevel: 2, gpu: "GTX 1650", cpu: "Intel i5-12500H", ramStorage: "8GB RAM - 512GB" },
  { id: "8", name: "HP OMEN 16", price: 1299, tier: "HIGH-END", powerLevel: 8, gpu: "RTX 4060", cpu: "AMD Ryzen 7 7840HS", ramStorage: "16GB RAM - 1000GB" },
  { id: "9", name: "HP OMEN 17", price: 2100, tier: "HIGH-END", powerLevel: 10, gpu: "RTX 4080", cpu: "Intel i7-13700HX", ramStorage: "32GB RAM - 1000GB" },
  { id: "10", name: "Dell G15 5530", price: 999, tier: "MID-RANGE", powerLevel: 5, gpu: "RTX 4050", cpu: "Intel i5-13450HX", ramStorage: "16GB RAM - 512GB" },
  { id: "11", name: "Dell G16 7630", price: 1299, tier: "MID-RANGE", powerLevel: 7, gpu: "RTX 4060", cpu: "Intel i7-13650HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "12", name: "Dell Alienware m16", price: 1700, tier: "HIGH-END", powerLevel: 9, gpu: "RTX 4070", cpu: "Intel i7-13700HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "13", name: "Acer Nitro 5", price: 849, tier: "MID-RANGE", powerLevel: 4, gpu: "RTX 4050", cpu: "AMD Ryzen 5 7535HS", ramStorage: "16GB RAM - 512GB" },
  { id: "14", name: "Acer Predator Helios 16", price: 1450, tier: "HIGH-END", powerLevel: 9, gpu: "RTX 4070", cpu: "Intel i7-13700HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "15", name: "Acer Aspire 7", price: 549, tier: "BUDGET", powerLevel: 1, gpu: "GTX 1650", cpu: "AMD Ryzen 5 5500U", ramStorage: "8GB RAM - 512GB" },
  { id: "16", name: "MSI Katana 15", price: 1099, tier: "MID-RANGE", powerLevel: 6, gpu: "RTX 4060", cpu: "Intel i7-12650H", ramStorage: "16GB RAM - 1000GB" },
  { id: "17", name: "MSI Raider GE78 HX", price: 3499, tier: "HIGH-END", powerLevel: 10, gpu: "RTX 4090", cpu: "Intel i9-13980HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "18", name: "MSI Thin GF63", price: 599, tier: "BUDGET", powerLevel: 2, gpu: "RTX 2050", cpu: "Intel i5-12450H", ramStorage: "8GB RAM - 512GB" },
  { id: "19", name: "Razer Blade 16", price: 4299, tier: "HIGH-END", powerLevel: 10, gpu: "RTX 4090", cpu: "Intel i9-13950HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "20", name: "Razer Blade 14", price: 2399, tier: "HIGH-END", powerLevel: 9, gpu: "RTX 4070", cpu: "AMD Ryzen 9 7940HS", ramStorage: "16GB RAM - 1000GB" },
  { id: "21", name: "Custom PC Budget Gaming PC", price: 420, tier: "BUDGET", powerLevel: 3, gpu: "GTX 1650", cpu: "Intel i3-12100F", ramStorage: "8GB RAM - 500GB" },
  { id: "22", name: "Custom PC Mid-Range Gaming PC", price: 800, tier: "MID-RANGE", powerLevel: 6, gpu: "RTX 3060", cpu: "AMD Ryzen 5 5600X", ramStorage: "16GB RAM - 1000GB" },
  { id: "23", name: "Custom PC High-End Gaming PC", price: 1500, tier: "HIGH-END", powerLevel: 9, gpu: "RTX 4070 Ti", cpu: "Intel i7-13700K", ramStorage: "32GB RAM - 2000GB" },
  { id: "24", name: "Custom PC Ultra Gaming PC", price: 3000, tier: "HIGH-END", powerLevel: 10, gpu: "RTX 4090", cpu: "Intel i9-13900K", ramStorage: "64GB RAM - 4000GB" },
  { id: "25", name: "Custom PC AMD Enthusiast PC", price: 2200, tier: "HIGH-END", powerLevel: 10, gpu: "RX 7900 XTX", cpu: "AMD Ryzen 9 7950X", ramStorage: "32GB RAM - 2000GB" }
];

export function calculatePerformance(laptop: Laptop, game: Game): PerformanceResult {
  const diff = laptop.powerLevel - game.demandLevel;
  
  let tag: PerformanceResult["tag"] = "Not Playable";
  let fps = 0;
  let resolution = "1080p";
  let battery = "1.5h";

  if (diff >= 2) {
    tag = "Ultra";
    fps = 60 + (diff * 8) + Math.floor(Math.random() * 10);
    resolution = "4K";
    battery = "1h";
  } else if (diff >= 0) {
    tag = "High";
    fps = 60 + (diff * 5) + Math.floor(Math.random() * 5);
    resolution = "1440p";
    battery = "1.2h";
  } else if (diff >= -2) {
    tag = "Medium";
    fps = 45 + ((diff + 2) * 5) + Math.floor(Math.random() * 5);
    resolution = "1440p";
    battery = "1.5h";
  } else if (diff >= -5) {
    tag = "Low Settings";
    fps = 30 + ((diff + 5) * 5) + Math.floor(Math.random() * 5);
    resolution = "1080p";
    battery = "2h";
  } else {
    tag = "Not Playable";
    fps = 15;
    resolution = "720p";
    battery = "2.5h";
  }

  // Cap FPS to 144
  if (fps > 144) fps = 144;

  return { tag, fps, resolution, battery };
}
