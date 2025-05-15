"use client";
import { Input } from "../../../app/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  ariaLabel?: string;
}

export function SearchBar({ onSearch, className, ariaLabel }: SearchBarProps) {
  return (
    <form className={`relative ${className}`} role="search">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="search"
          placeholder="ابحث عن وظيفة..."
          className="w-full pl-10 pr-4 text-right"
          onChange={(e) => onSearch(e.target.value)}
          aria-label={ariaLabel || "بحث عن الوظائف"}
        />
      </div>
    </form>
  );
}
