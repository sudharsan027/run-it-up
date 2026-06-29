const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE = 'https://api.rawg.io/api';

export interface RawgGame {
  id: number;
  name: string;
  background_image: string | null;
  genres: { id: number; name: string }[];
  released: string | null;
  metacritic: number | null;
  platforms: Array<{
    platform: { id: number; name: string; slug: string };
    requirements?: { minimum?: string; recommended?: string };
  }> | null;
}

export interface RawgGameDetail extends RawgGame {
  description_raw: string;
}

export interface GamesResponse {
  count: number;
  next: string | null;
  results: RawgGame[];
}

export async function fetchGames(search = '', page = 1, ordering = '-metacritic'): Promise<GamesResponse> {
  const params = new URLSearchParams({ key: RAWG_KEY, page_size: '24', page: String(page), platforms: '4' });
  if (search) { params.set('search', search); } 
  else { params.set('ordering', ordering); params.set('metacritic', '55,100'); }
  const res = await fetch(`${BASE}/games?${params}`);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

export async function fetchGameDetail(id: number): Promise<RawgGameDetail> {
  const res = await fetch(`${BASE}/games/${id}?key=${RAWG_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch game detail');
  return res.json();
}

export function getPCRequirements(game: RawgGame | RawgGameDetail) {
  if (!game.platforms) return null;
  const pc = game.platforms.find(p => p.platform.slug === 'pc');
  return pc?.requirements ?? null;
}

export function parseReqField(text: string, field: string): string {
  if (!text) return 'Not specified';
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (line.toLowerCase().includes(field.toLowerCase() + ':')) {
      return line.split(':').slice(1).join(':').replace(/\*/g, '').trim() || 'Not specified';
    }
  }
  return 'Not specified';
}

export function getGPUPowerFromText(text: string): number {
  if (!text) return 3;
  const t = text.toLowerCase();
  if (t.includes('rtx 4090') || t.includes('rtx 3090')) return 10;
  if (t.includes('rtx 4080') || t.includes('rtx 3080')) return 9;
  if (t.includes('rtx 4070 ti') || t.includes('rtx 3080 ti')) return 8.5;
  if (t.includes('rtx 4070') || t.includes('rtx 3070') || t.includes('rx 7800')) return 8;
  if (t.includes('rtx 4060 ti') || t.includes('rtx 3060 ti') || t.includes('rx 7700')) return 7.5;
  if (t.includes('rtx 4060') || t.includes('rtx 3060') || t.includes('rx 7600') || t.includes('rx 6700')) return 7;
  if (t.includes('rtx 4050') || t.includes('rtx 2070') || t.includes('rtx 3050') || t.includes('rx 6600')) return 6.5;
  if (t.includes('rtx 2060') || t.includes('gtx 1080 ti') || t.includes('rx 5700')) return 6;
  if (t.includes('gtx 1080') || t.includes('gtx 1660 ti') || t.includes('rtx 2050') || t.includes('rx 5600')) return 5.5;
  if (t.includes('gtx 1070') || t.includes('gtx 1660') || t.includes('rx 580') || t.includes('rx 590')) return 5;
  if (t.includes('gtx 1060') || t.includes('gtx 970') || t.includes('rx 570') || t.includes('rx 480')) return 4.5;
  if (t.includes('gtx 1650') || t.includes('gtx 1050 ti') || t.includes('gtx 960') || t.includes('rx 470')) return 4;
  if (t.includes('gtx 1050') || t.includes('gtx 950') || t.includes('rx 460')) return 3.5;
  if (t.includes('gtx 750') || t.includes('gtx 770') || t.includes('r9 380')) return 3;
  if (t.includes('gtx 730') || t.includes('gt 1030') || t.includes('r7 260')) return 2;
  if (t.includes('intel hd') || t.includes('intel uhd') || t.includes('intel iris')) return 1;
  return 3;
}

// Estimate demand from metacritic + year for games without requirements
export function estimateDemandLevel(metacritic: number | null, released: string | null): number {
  const year = released ? new Date(released).getFullYear() : 2018;
  const score = metacritic ?? 70;
  let base = 3;
  if (year >= 2024) base = 8;
  else if (year >= 2022) base = 7;
  else if (year >= 2020) base = 6;
  else if (year >= 2018) base = 5;
  else if (year >= 2015) base = 4;
  else if (year >= 2010) base = 3;
  else base = 2;
  // High metacritic + recent often means high demand AAA
  if (score >= 85 && year >= 2020) base += 1;
  return Math.min(10, base);
}
