import { categories } from "@/const/categories-section";
import { useMarketStore } from "@/store/marketStore";

export const MobileCategoryStrip = () => {
  const { selectedCategory, setSelectedCategory } = useMarketStore();

  const all = [
    { id: null, title: "All" },
    ...categories.map((c) => ({ id: c.id, title: c.title })),
  ];

  return (
    <div className="lg:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 w-max pb-1">
        {all.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id ?? "all"}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-colors whitespace-nowrap ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-500 border-neutral-300 hover:border-black hover:text-black"
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
