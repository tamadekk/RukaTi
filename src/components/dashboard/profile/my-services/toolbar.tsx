import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Category = {
  id: string;
  title: string;
};

type ServicesToolbarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
};

export const ServicesToolbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: ServicesToolbarProps) => {
  return (
    <div className="bg-white border-2 border-black p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-none border-0 focus-visible:ring-0 font-mono text-sm bg-neutral-50"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2 bg-neutral-100 p-1">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent font-mono text-xs uppercase tracking-widest px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
