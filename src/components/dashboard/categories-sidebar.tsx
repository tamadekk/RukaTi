import { Search, X } from "lucide-react";
import { categories } from "@/const/categories-section";
import { useMarketStore } from "@/store/marketStore";
import { useServiceSearch } from "@/hooks/use-service-search";

const CategoriesSidebar = () => {
  const { selectedCategory, setSelectedCategory } = useMarketStore();
  const { searchQuery, handleSearch, clearSearch } = useServiceSearch();

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Search */}
      <div className="flex items-center border border-black bg-white">
        <Search className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
        <input
          type="text"
          defaultValue={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search services..."
          className="flex-1 px-3 py-2.5 text-xs font-mono bg-transparent outline-none placeholder:text-neutral-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="mr-2 text-neutral-400 hover:text-black transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="font-semibold mb-1 uppercase tracking-tight text-sm text-gray-500">
        Categories
      </div>
      <div className="flex flex-col border border-black bg-white">
        <button
          data-active={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
          className="w-full justify-start text-left font-mono text-xs uppercase tracking-wide py-3 px-4 border-b border-black hover:bg-neutral-50 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:hover:bg-black/90 last:border-b-0"
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-active={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="w-full justify-start text-left font-mono text-xs uppercase tracking-wide py-3 px-4 border-b border-black hover:bg-neutral-50 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:hover:bg-black/90 last:border-b-0"
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
