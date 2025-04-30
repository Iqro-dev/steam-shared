"use client";

import { Input } from "@/components/ui/input";

interface SearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export function Search({ onSearch, placeholder, className }: SearchProps) {
  return (
    <Input
      placeholder={placeholder}
      className={className}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
