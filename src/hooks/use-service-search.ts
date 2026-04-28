import { useRef } from "react";
import { useMarketStore } from "@/store/marketStore";
import { scrollToTop } from "@/lib/utils";

export const useServiceSearch = (delay = 350) => {
  const { searchQuery, setSearchQuery } = useMarketStore();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
      if (window.innerWidth < 1024) scrollToTop();
    }, delay);
  };

  const clearSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchQuery("");
  };

  return { searchQuery, handleSearch, clearSearch };
};
