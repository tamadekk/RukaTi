import { categories } from "@/const/categories-section";
import { Button } from "@/components/ui/button";
import { useMarketStore } from "@/store/marketStore";

const CategoriesSidebar = () => {
  const { selectedCategory, setSelectedCategory } = useMarketStore();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="font-semibold mb-2 uppercase tracking-tight text-sm text-gray-500">
        Categories
      </div>
      <div className="space-y-1">
        <Button
          variant="ghost"
          data-active={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
          className="w-full justify-start font-mono text-xs uppercase tracking-wide h-auto py-3 px-2 whitespace-normal text-left border-b border-gray-200 rounded-none hover:bg-neutral-50 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:hover:bg-black/90"
        >
          All Categories
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant="ghost"
            data-active={selectedCategory === cat.title}
            onClick={() => setSelectedCategory(cat.title)}
            className="w-full justify-start font-mono text-xs uppercase tracking-wide h-auto py-3 px-2 whitespace-normal text-left border-b border-gray-200 rounded-none hover:bg-neutral-50 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:hover:bg-black/90"
          >
            {cat.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
