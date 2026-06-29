export interface Game {
  id: string;
  title: string;
  genre: string;
  iconInitials: string;
}

export interface Laptop {
  id: string;
  name: string;
  price: number;
  tier: "HIGH-END" | "MID-RANGE" | "BUDGET";
  gpu: string;
  cpu: string;
  ramStorage: string;
}

export const games: Game[] = [
  { id: "1", title: "Cyberpunk 2077", genre: "RPG", iconInitials: "CP" },
  { id: "2", title: "GTA V", genre: "Action", iconInitials: "GT" },
  { id: "3", title: "Valorant", genre: "FPS", iconInitials: "VL" },
  { id: "4", title: "Elden Ring", genre: "RPG", iconInitials: "ER" },
  { id: "5", title: "Fortnite", genre: "Battle Royale", iconInitials: "FN" },
  { id: "6", title: "Hogwarts Legacy", genre: "RPG", iconInitials: "HL" },
  { id: "7", title: "Minecraft", genre: "Sandbox", iconInitials: "MC" },
  { id: "8", title: "Red Dead Redemption 2", genre: "Action", iconInitials: "RD" },
  { id: "9", title: "Call of Duty: Warzone", genre: "FPS", iconInitials: "CW" },
  { id: "10", title: "Apex Legends", genre: "Battle Royale", iconInitials: "AL" },
  { id: "11", title: "The Witcher 3", genre: "RPG", iconInitials: "W3" },
  { id: "12", title: "God of War Ragnarok", genre: "Action RPG", iconInitials: "GW" },
  { id: "13", title: "EA Sports FC 24", genre: "Sports", iconInitials: "FC" },
  { id: "14", title: "League of Legends", genre: "MOBA", iconInitials: "LL" },
  { id: "15", title: "Spider-Man Remastered", genre: "Action", iconInitials: "SM" },
  { id: "16", title: "Resident Evil 4 Remake", genre: "Horror", iconInitials: "RE" },
  { id: "17", title: "Starfield", genre: "RPG", iconInitials: "SF" },
  { id: "18", title: "Counter-Strike 2", genre: "FPS", iconInitials: "CS" },
  { id: "19", title: "Baldur's Gate 3", genre: "RPG", iconInitials: "BG" },
  { id: "20", title: "Diablo IV", genre: "Action RPG", iconInitials: "D4" },
  { id: "21", title: "Horizon Forbidden West", genre: "Action RPG", iconInitials: "HZ" },
  { id: "22", title: "Helldivers 2", genre: "Shooter", iconInitials: "HD" },
  { id: "23", title: "Palworld", genre: "Survival", iconInitials: "PW" },
  { id: "24", title: "Alan Wake 2", genre: "Horror", iconInitials: "AW" }
];

export const laptops: Laptop[] = [
  { id: "1", name: "ASUS ROG Strix G16", price: 2199, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i9-13980HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "2", name: "ASUS ROG Zephyrus G14", price: 1599, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 9 7940HS", ramStorage: "16GB RAM - 512GB" },
  { id: "3", name: "ASUS TUF Gaming F15", price: 1100, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "Intel i7-12700H", ramStorage: "16GB RAM - 512GB" },
  { id: "4", name: "Lenovo Legion 5 Pro", price: 1499, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7745HX", ramStorage: "16GB RAM - 512GB" },
  { id: "5", name: "Lenovo Legion 7i", price: 2500, tier: "HIGH-END", gpu: "RTX 4080", cpu: "Intel i9-13900HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "6", name: "Lenovo IdeaPad Gaming 3", price: 850, tier: "BUDGET", gpu: "RTX 3050", cpu: "AMD Ryzen 5 5600H", ramStorage: "8GB RAM - 256GB" },
  { id: "7", name: "HP Victus 15", price: 699, tier: "BUDGET", gpu: "GTX 1650", cpu: "Intel i5-12500H", ramStorage: "8GB RAM - 512GB" },
  { id: "8", name: "HP OMEN 16", price: 1299, tier: "HIGH-END", gpu: "RTX 4060", cpu: "AMD Ryzen 7 7840HS", ramStorage: "16GB RAM - 1000GB" },
  { id: "9", name: "HP OMEN 17", price: 2100, tier: "HIGH-END", gpu: "RTX 4080", cpu: "Intel i7-13700HX", ramStorage: "32GB RAM - 1000GB" },
  { id: "10", name: "Dell G15 5530", price: 999, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "Intel i5-13450HX", ramStorage: "16GB RAM - 512GB" },
  { id: "11", name: "Dell G16 7630", price: 1299, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-13650HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "12", name: "Dell Alienware m16", price: 1700, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i7-13700HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "13", name: "Acer Nitro 5", price: 849, tier: "MID-RANGE", gpu: "RTX 4050", cpu: "AMD Ryzen 5 7535HS", ramStorage: "16GB RAM - 512GB" },
  { id: "14", name: "Acer Predator Helios 16", price: 1450, tier: "HIGH-END", gpu: "RTX 4070", cpu: "Intel i7-13700HX", ramStorage: "16GB RAM - 1000GB" },
  { id: "15", name: "Acer Aspire 7", price: 549, tier: "BUDGET", gpu: "GTX 1650", cpu: "AMD Ryzen 5 5500U", ramStorage: "8GB RAM - 512GB" },
  { id: "16", name: "MSI Katana 15", price: 1099, tier: "MID-RANGE", gpu: "RTX 4060", cpu: "Intel i7-12650H", ramStorage: "16GB RAM - 1000GB" },
  { id: "17", name: "MSI Raider GE78 HX", price: 3499, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-13980HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "18", name: "MSI Thin GF63", price: 599, tier: "BUDGET", gpu: "RTX 2050", cpu: "Intel i5-12450H", ramStorage: "8GB RAM - 512GB" },
  { id: "19", name: "Razer Blade 16", price: 4299, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-13950HX", ramStorage: "32GB RAM - 2000GB" },
  { id: "20", name: "Razer Blade 14", price: 2399, tier: "HIGH-END", gpu: "RTX 4070", cpu: "AMD Ryzen 9 7940HS", ramStorage: "16GB RAM - 1000GB" },
  { id: "21", name: "Custom PC Budget Gaming PC", price: 420, tier: "BUDGET", gpu: "GTX 1650", cpu: "Intel i3-12100F", ramStorage: "8GB RAM - 500GB" },
  { id: "22", name: "Custom PC Mid-Range Gaming PC", price: 800, tier: "MID-RANGE", gpu: "RTX 3060", cpu: "AMD Ryzen 5 5600X", ramStorage: "16GB RAM - 1000GB" },
  { id: "23", name: "Custom PC High-End Gaming PC", price: 1500, tier: "HIGH-END", gpu: "RTX 4070 Ti", cpu: "Intel i7-13700K", ramStorage: "32GB RAM - 2000GB" },
  { id: "24", name: "Custom PC Ultra Gaming PC", price: 3000, tier: "HIGH-END", gpu: "RTX 4090", cpu: "Intel i9-13900K", ramStorage: "64GB RAM - 4000GB" },
  { id: "25", name: "Custom PC AMD Enthusiast PC", price: 2200, tier: "HIGH-END", gpu: "RX 7900 XTX", cpu: "AMD Ryzen 9 7950X", ramStorage: "32GB RAM - 2000GB" }
];
