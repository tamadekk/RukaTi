import { create } from "zustand";

const DEFAULT_PAGE_SIZE = 9;

type MarketUIStore = {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
};

export const useMarketStore = create<MarketUIStore>((set) => ({
  selectedCategory: null,
  searchQuery: "",
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,

  setSelectedCategory: (categoryId) =>
    set({ selectedCategory: categoryId, page: 1 }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

  setPage: (page) => set({ page }),
}));
