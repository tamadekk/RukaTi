import { useEffect, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useMarketStore } from "@/store/marketStore";
import { useUserSession } from "@/store/userSessionsStore";
import { toast } from "sonner";
import type { UploadReview } from "@/types/user";
import { Button } from "@/components/ui/button";
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
        <div className="flex flex-col h-full items-center justify-center p-6 mt-12 mb-20">
          <div className="max-w-md w-full bg-white border border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 border border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 font-mono text-sm">
              We couldn't find the service you were looking for. It may have
              been removed or the link is broken.
            </p>
            <div className="pt-6 border-t border-black">
              <Link to="/services" className="inline-block w-full">
                <Button className="w-full uppercase font-bold tracking-widest border border-black bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors h-12">
                  Back to Services
                </Button>
              </Link>
            </div>
          </div>
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
            image={
              typeof currentService.service_image === "string"
                ? currentService.service_image
                : undefined
            }
            title={currentService.title}
            category={currentService.category}
          />
          <ServiceInfo
            title={currentService.title}
            location={currentService.location ?? ""}
            price_range={currentService.price_range ?? ""}
            availability={currentService.availability ?? ""}
            rating={currentService.rating}
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
