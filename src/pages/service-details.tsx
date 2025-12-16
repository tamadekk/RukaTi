import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";

import {
  MapPin,
  Calendar,
  DollarSign,
  Star,
  ArrowLeft,
  Share2,
} from "lucide-react";

export function ServiceDetailsPage() {
  const { serviceId } = useParams({ from: "/services/$serviceId" });
  const {
    currentService,
    providerProfile,
    loading,
    error,
    fetchServiceDetails,
  } = useMarketStore();

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails(serviceId);
    }
  }, [serviceId, fetchServiceDetails]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You might want to add a toast notification here later
    alert("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono">
          Loading details...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !currentService) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center font-mono text-red-500">
          {error || "Service not found"}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 font-mono max-w-5xl mx-auto w-full">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center border-b border-black pb-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="pl-0 hover:bg-transparent hover:underline uppercase font-bold tracking-widest gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="rounded-none border-black hover:bg-gray-100 uppercase gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Content Header */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-full md:w-3/5 aspect-video border border-black overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
            <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
              {currentService.category}
            </div>
          </div>

          {/* Key Info Side */}
          <div className="w-full md:w-2/5 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none mb-4">
                {currentService.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 border-l-2 border-black pl-3">
                <MapPin className="w-4 h-4" />
                <span className="uppercase tracking-wide text-sm">
                  {currentService.location || "Remote / Online"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="bg-gray-50 border border-black p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase">
                    <DollarSign className="w-4 h-4" />
                    <span>Price</span>
                  </div>
                  <span className="text-lg font-bold">
                    {currentService.price_range || "Negotiable"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase">
                    <Calendar className="w-4 h-4" />
                    <span>Availability</span>
                  </div>
                  <span className="text-sm">
                    {currentService.availability || "Flexible"}
                  </span>
                </div>
              </div>

              <Button className="w-full text-lg h-14 uppercase font-bold tracking-widest bg-black text-white hover:bg-neutral-800 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all">
                Contact Provider
              </Button>
            </div>
          </div>
        </div>

        {/* Description & Provider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-black">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-black"></span>
              About This Service
            </h2>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
              {currentService.description}
            </p>
          </div>

          {/* Provider Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-black p-6 bg-white space-y-6 relative">
              <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                Service Provider
              </div>

              {providerProfile?.user_id && (
                <Link
                  to="/provider/$userId"
                  params={{ userId: providerProfile.user_id }}
                  className="flex flex-col items-center text-center gap-4 hover:opacity-75 transition-opacity group"
                >
                  <Avatar className="w-24 h-24 border-2 border-black rounded-none group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <AvatarImage
                      src={providerProfile?.avatar || undefined}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-none bg-gray-200 text-2xl font-bold">
                      {providerProfile?.email?.substring(0, 2).toUpperCase() ||
                        "??"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="font-bold text-xl uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
                      {providerProfile?.email?.split("@")[0] || "Provider"}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase">
                      Rating: {providerProfile?.rating || "N/A"}
                    </div>
                  </div>
                </Link>
              )}

              {providerProfile?.bio && (
                <div className="bg-gray-50 p-3 text-sm text-gray-600 italic border-l-2 border-gray-300">
                  "{providerProfile.bio}"
                </div>
              )}

              {providerProfile?.phone_number && (
                <Button
                  variant="outline"
                  className="w-full rounded-none border-black font-bold uppercase"
                >
                  tel: {providerProfile.phone_number}
                </Button>
              )}
            </div>

            {/* Reviews Placeholder - Smaller */}
            <div className="border border-dashed border-gray-300 p-4 text-center">
              <p className="text-xs text-gray-400 uppercase font-bold">
                Reviews coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
