import { useState, useMemo } from "react";
import { useServiceStore } from "@/store/userServicesStore";
import { useInitializeUser } from "@/hooks/init-userProfile";
import { ServicesHeader } from "@/components/dashboard/profile/my-services/header";
import { ServicesStats } from "@/components/dashboard/profile/my-services/stats";
import { ServicesToolbar } from "@/components/dashboard/profile/my-services/toolbar";
import { ServicesList } from "@/components/dashboard/profile/my-services/list";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { categories } from "@/const/categories-section";

const MyServicesPage = () => {
  useInitializeUser();
  const services = useServiceStore((state) => state.userServices) || [];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    return {
      total: services.length,
      filtered: filteredServices.length,
    };
  }, [services, filteredServices]);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ServicesHeader onCreateClick={() => setIsCreateModalOpen(true)} />
        <ServicesStats total={stats.total} filtered={stats.filtered} />
        <ServicesToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <ServicesList
          services={filteredServices}
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
        />
      </div>

      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default MyServicesPage;
