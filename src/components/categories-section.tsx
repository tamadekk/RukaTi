import { categories } from "@/const/categories-section";
const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group-hover:scale-105">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {category.title}
          </h3>
          <p className="text-xs text-gray-600">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
