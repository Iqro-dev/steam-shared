"use client";

import { cn } from "@/lib/utils";

export type SteamStatus = number;

interface StatusProps {
  status: SteamStatus;
  className?: string;
}

const statusConfig: Record<number, { label: string; color: string }> = {
  0: { label: "Offline", color: "bg-gray-500" },
  1: { label: "Online", color: "bg-green-500" },
  2: { label: "Busy", color: "bg-red-500" },
  3: { label: "Away", color: "bg-yellow-500" },
  4: { label: "Snooze", color: "bg-blue-500" },
  5: { label: "Looking to Trade", color: "bg-purple-500" },
};

export function FriendStatus({ status, className }: StatusProps) {
  const { label, color } = statusConfig[status] ?? statusConfig[0];

  return (
    <div className="flex items-center gap-2">
      <div className={cn("size-2 rounded-full", color, className)} />

      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
