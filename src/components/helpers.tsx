import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

export function getTierColor(tier: string) {
  switch (tier) {
    case "HIGH-END": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "ENTHUSIAST": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    case "MID-RANGE": return "text-teal-400 bg-teal-400/10 border-teal-400/20";
    case "BUDGET": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    default: return "text-zinc-400 bg-zinc-800 border-zinc-700";
  }
}

export function getTagStyles(tag: string) {
  switch (tag) {
    case "Ultra": return { color: "text-purple-400", bg: "bg-purple-400/10", icon: <ShieldCheck className="w-3 h-3" /> };
    case "High": return { color: "text-orange-400", bg: "bg-orange-400/10", icon: <Flame className="w-3 h-3" /> };
    case "Medium": return { color: "text-green-400", bg: "bg-green-400/10", icon: <CheckCircle2 className="w-3 h-3" /> };
    case "Low Settings": return { color: "text-yellow-400", bg: "bg-yellow-400/10", icon: <AlertTriangle className="w-3 h-3" /> };
    case "Not Playable": return { color: "text-red-400", bg: "bg-red-400/10", icon: <XCircle className="w-3 h-3" /> };
    default: return { color: "text-zinc-400", bg: "bg-zinc-800", icon: null };
  }
}

export type SortMode = 'compat' | 'price-asc' | 'price-desc' | 'fps';
