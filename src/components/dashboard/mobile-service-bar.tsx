import { Search, ChevronDown } from "lucide-react";
import { categories } from "@/const/categories-section";
import { useMarketStore } from "@/store/marketStore";
import { useServiceSearch } from "@/hooks/use-service-search";

export const MobileServiceBar = () => {
  const { selectedCategory, setSelectedCategory } = useMarketStore();
  const { searchQuery, handleSearch } = useServiceSearch();

  const selectedLabel =
    categories.find((c) => c.id === selectedCategory)?.title ?? "All";

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-white border-b-2 border-black">
      {/* Search row */}
      <div className="flex items-stretch border-b border-black">
        {/* Category select */}
        <div className="relative flex items-center border-r border-black px-3 gap-1 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            {selectedLabel}
          </span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
            aria-label="Category"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search input */}
        <div className="flex items-center flex-1 gap-2 px-3">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            defaultValue={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search services..."
            className="flex-1 py-3 text-sm font-mono bg-transparent outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Category chips — hidden on desktop where the sidebar handles this */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide px-4 py-2">
        <div className="flex gap-2 w-max">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wider border transition-colors whitespace-nowrap rounded-full ${
              selectedCategory === null
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-500 border-neutral-300 hover:border-black hover:text-black"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wider border transition-colors whitespace-nowrap rounded-full ${
                selectedCategory === cat.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-500 border-neutral-300 hover:border-black hover:text-black"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
