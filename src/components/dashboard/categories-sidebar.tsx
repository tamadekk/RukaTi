import { categories } from "@/const/categories-section";
import { Button } from "@/components/ui/button";

const CategoriesSidebar = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="font-semibold mb-2 uppercase tracking-tight text-sm text-gray-500">Categories</div>
      <div className="space-y-1">
        {categories.map((cat) => (
            <Button
                key={cat.id}
                variant="ghost" 
                className="w-full justify-start font-mono text-xs uppercase tracking-wide h-auto py-3 px-2 whitespace-normal text-left border-b border-gray-200 rounded-none hover:bg-neutral-50"
            >
                {cat.title}
            </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
