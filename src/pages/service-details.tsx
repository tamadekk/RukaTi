import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { MapPin, Calendar, DollarSign, Star } from "lucide-react";

export function ServiceDetailsPage() {
  const { serviceId } = useParams({ from: "/services/$serviceId" });
  const { currentService, providerProfile, loading, error, fetchServiceDetails } = useMarketStore();

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails(serviceId);
    }
  }, [serviceId, fetchServiceDetails]);

  if (loading) {
    return (
        <DashboardLayout sidebar={<CategoriesSidebar />}>
            <div className="flex h-full items-center justify-center font-mono">
                Loading details...
            </div>
        </DashboardLayout>
    );
  }

  if (error || !currentService) {
    return (
        <DashboardLayout sidebar={<CategoriesSidebar />}>
            <div className="flex h-full items-center justify-center font-mono text-red-500">
                {error || "Service not found"}
            </div>
        </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebar={<CategoriesSidebar />}>
      <div className="space-y-8 font-mono">
        
        {/* Header Section */}
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[3/2] border border-black overflow-hidden relative">
                     {currentService.service_image ? (
                        <img 
                            src={currentService.service_image} 
                            alt={currentService.title} 
                            className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                     )}
                     <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 text-xs font-bold uppercase">
                        {currentService.category}
                     </div>
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tight leading-none mb-2">{currentService.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                             <MapPin className="w-4 h-4" />
                             <span>{currentService.location || "Remote / Online"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex justify-between items-center border-b border-black pb-2">
                             <div className="flex items-center gap-2 font-bold">
                                <DollarSign className="w-4 h-4" />
                                <span>PRICE</span>
                             </div>
                             <span className="text-lg">{currentService.price_range || "Negotiable"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black pb-2">
                             <div className="flex items-center gap-2 font-bold">
                                <Calendar className="w-4 h-4" />
                                <span>AVAILABILITY</span>
                             </div>
                             <span>{currentService.availability || "Flexible"}</span>
                        </div>
                    </div>

                    <Button className="w-full text-lg h-12 uppercase font-bold tracking-widest mt-4">
                        Contact Provider
                    </Button>
                </div>
            </div>
        </div>

         {/* Description */}
         <div className="space-y-2">
            <h2 className="text-lg font-bold uppercase border-b border-black pb-1">About This Service</h2>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {currentService.description}
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Provider Info */}
             <div className="border border-black p-6 bg-white space-y-4">
                <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">Service Provider</h2>
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border border-black rounded-none">
                        <AvatarImage src={providerProfile?.avatar || undefined} />
                        <AvatarFallback className="rounded-none bg-gray-200">
                            {providerProfile?.email?.substring(0,2).toUpperCase() || "??"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold text-lg">{providerProfile?.email?.split('@')[0] || "Provider"}</div>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-black font-bold">{providerProfile?.rating || "N/A"}</span>
                            <span className="text-gray-400 text-xs ml-1">(No reviews yet)</span>
                        </div>
                    </div>
                </div>
                {providerProfile?.bio && (
                    <p className="text-sm text-gray-600 italic">
                        "{providerProfile.bio}"
                    </p>
                )}
                {providerProfile?.phone_number && (
                     <div className="text-sm flex items-center gap-2 pt-2 border-t border-gray-100">
                        <span className="font-bold">Tel:</span> {providerProfile.phone_number}
                     </div>
                )}
             </div>

             {/* Reviews Placeholder */}
             <div className="border border-black p-6 bg-gray-50 space-y-4 opacity-75">
                 <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">Reviews</h2>
                 <div className="text-center py-8 text-gray-500 text-sm italic">
                    Feature coming soon. <br/> Be the first to review this service!
                 </div>
             </div>
         </div>

      </div>
    </DashboardLayout>
  );
}
