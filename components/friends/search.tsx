"use client";

import { Input } from "@/components/ui/input";

interface SearchProps {
  onSearch: (term: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  return (
    <Input
      placeholder="Search friends..."
      className="w-56"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
