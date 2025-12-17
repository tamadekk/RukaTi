import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { useUserSession } from "@/store/userSessionsStore";
import { toast } from "sonner";
import type { Review } from "@/types/user";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ServiceHeader } from "@/components/service-details/service-header";
import { ServiceGallery } from "@/components/service-details/service-gallery";
import { ServiceInfo } from "@/components/service-details/service-info";
import { ServiceDescription } from "@/components/service-details/service-description";
import { ServiceProviderCard } from "@/components/service-details/service-provider-card";
import { ServiceReviews } from "@/components/service-details/service-reviews";

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
    toast.success("Link copied to clipboard!");
  };

  const handleBack = () => {
    window.history.back();
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

  // Mock reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      reviewer_name: "Alice Cooper",
      rating: 5,
      comment: "Excellent service! Very professional and timely.",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "2",
      reviewer_name: "Bob Smith",
      rating: 4,
      comment: "Great work, but arrived a bit late.",
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);

  const { user } = useUserSession();

  const handleReviewSubmit = async (rating: number, comment: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReview: Review = {
      id: Math.random().toString(36).substring(7),
      reviewer_name: user?.email ?? "Anonymous",
      reviewer_avatar: user?.user_metadata?.avatar_url,
      rating,
      comment,
      created_at: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 font-mono max-w-5xl mx-auto w-full">
        <ServiceHeader onBack={handleBack} onShare={handleShare} />

        <div className="flex flex-col md:flex-row gap-8">
          <ServiceGallery
            image={currentService.service_image ?? undefined}
            title={currentService.title}
            category={currentService.category}
          />
          <ServiceInfo
            title={currentService.title}
            location={currentService.location ?? ""}
            price_range={currentService.price_range ?? ""}
            availability={currentService.availability ?? ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-black">
          <ServiceDescription description={currentService.description} />
          {providerProfile && (
            <ServiceProviderCard provider={providerProfile} />
          )}
        </div>
        <ServiceReviews
          reviews={reviews}
          currentUser={user}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </DashboardLayout>
  );
}
