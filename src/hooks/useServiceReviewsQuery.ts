import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase-client";
import { queryKeys } from "@/lib/queryKeys";
import type { Review, UploadReview } from "@/types/user";

export const useServiceReviews = (serviceId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.serviceReviews(serviceId!),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_service_review")
        .select("*, user_profile(full_name, avatar)")
        .eq("service_id", serviceId!);
      if (error) throw error;
      return (data as Review[]) ?? [];
    },
    enabled: !!serviceId,
  });
};

export const useUploadReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review: UploadReview) => {
      const { error } = await supabase
        .from("user_service_review")
        .insert(review);
      if (error) throw error;
    },
    onSuccess: (_, review) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.serviceReviews(review.service_id),
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reviewId,
      updates,
    }: {
      reviewId: string;
      serviceId: string;
      updates: Partial<UploadReview>;
    }) => {
      const { error } = await supabase
        .from("user_service_review")
        .update(updates)
        .eq("review_id", reviewId);
      if (error) throw error;
    },
    onSuccess: (_, { serviceId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.serviceReviews(serviceId),
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reviewId,
    }: {
      reviewId: string;
      serviceId: string;
    }) => {
      const { error } = await supabase
        .from("user_service_review")
        .delete()
        .eq("review_id", reviewId);
      if (error) throw error;
    },
    onSuccess: (_, { serviceId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.serviceReviews(serviceId),
      });
    },
  });
};
