import { categories } from "@/const/categories-section";
const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white border border-black hover:bg-neutral-50 transition-colors duration-200">
        <div className="aspect-square w-full overflow-hidden border-b border-black">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-sm font-bold text-black mb-1 uppercase tracking-tight">
            {category.title}
          </h3>
          <p className="text-xs text-gray-500 font-mono">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  return (
    <section className="bg-white border-t border-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-x border-black max-w-7xl py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
            Discover services in your community or offer your skills in these
            popular categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
