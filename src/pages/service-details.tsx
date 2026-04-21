import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { useUserSession } from "@/store/userSessionsStore";
import { toast } from "sonner";
import type { UploadReview } from "@/types/user";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ServiceHeader } from "@/components/service-details/service-header";
import { ServiceGallery } from "@/components/service-details/service-gallery";
import { ServiceInfo } from "@/components/service-details/service-info";
import { ServiceDescription } from "@/components/service-details/service-description";
import { ServiceProviderCard } from "@/components/service-details/service-provider-card";
import { ServiceReviewForm } from "@/components/service-details/service-review-form";
import { useServicesReviewsStore } from "@/store/servicesReviewsStore";
import { ServiceReviews } from "@/components/service-details/service-reviews";
import { useAsyncAction } from "@/hooks/use-async-action";

export function ServiceDetailsPage() {
  const { serviceId } = useParams({ from: "/services/$serviceId" });
  const {
    currentService,
    providerProfile,
    loading,
    error,
    fetchServiceDetails,
  } = useMarketStore();

  const { user } = useUserSession();
  const { reviews, uploadReview, updateReview, deleteReview, loadReviews } =
    useServicesReviewsStore();

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const { isLoading: isSubmitting, execute: executeSubmit } = useAsyncAction();
  const { isLoading: isDeleting, execute: executeDelete } = useAsyncAction();

  const currentUserReview = user
    ? reviews.find((r) => r.user_id === user.id)
    : undefined;

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails(serviceId);
      loadReviews(serviceId);
    }
  }, [serviceId, fetchServiceDetails, loadReviews]);

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

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!user || !currentService) {
      toast.error("You must be logged in to leave a review");
      return;
    }
    await executeSubmit(
      async () => {
        const newReview: UploadReview = {
          review_id: crypto.randomUUID(),
          user_id: user.id,
          service_id: currentService.service_id,
          review_rating: rating,
          review_text: comment,
          created_at: new Date().toISOString(),
        };
        await uploadReview(newReview);
      },
      {
        successMessage: "Review submitted successfully!",
        errorMessage: "Failed to submit review",
      },
    );
  };

  const handleReviewUpdate = async (
    reviewId: string,
    rating: number,
    comment: string,
  ) => {
    await executeSubmit(
      async () => {
        await updateReview(reviewId, {
          review_rating: rating,
          review_text: comment,
        });
        setEditingReviewId(null);
      },
      {
        successMessage: "Review updated successfully!",
        errorMessage: "Failed to update review",
      },
    );
  };

  const handleReviewDelete = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await executeDelete(
        async () => {
          await deleteReview(reviewId);
          setEditingReviewId(null);
        },
        {
          successMessage: "Review deleted successfully",
          errorMessage: "Failed to delete review",
        },
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 font-mono max-w-5xl mx-auto w-full">
        <ServiceHeader onBack={handleBack} onShare={handleShare} />

        <div className="flex flex-col md:flex-row gap-8">
          <ServiceGallery
            image={typeof currentService.service_image === "string" ? currentService.service_image : undefined}
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
        <ServiceReviewForm
          currentUserReview={currentUserReview}
          currentUser={user}
          isLoading={isSubmitting}
          onSubmit={handleReviewSubmit}
          totalReviews={reviews.length}
        />
        <ServiceReviews
          reviews={reviews}
          currentUser={user}
          editingReviewId={editingReviewId}
          isDeleting={isDeleting}
          isSubmitting={isSubmitting}
          onEditStart={setEditingReviewId}
          onEditCancel={() => setEditingReviewId(null)}
          onUpdate={handleReviewUpdate}
          onDelete={handleReviewDelete}
        />
      </div>
    </DashboardLayout>
  );
}
