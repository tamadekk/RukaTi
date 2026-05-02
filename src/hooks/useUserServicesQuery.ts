import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase-client";
import { queryKeys } from "@/lib/queryKeys";
import type { UserServices } from "@/types/user";

export const useUserServices = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.userServices(userId!),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_service")
        .select("*")
        .eq("user_id", userId!);
      if (error) throw error;
      return data as UserServices[];
    },
    enabled: !!userId,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: UserServices) => {
      const { error } = await supabase.from("user_service").insert(service);
      if (error) throw error;
    },
    onSuccess: (_, service) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userServices(service.user_id),
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
      updates,
    }: {
      serviceId: string;
      userId: string;
      updates: Partial<UserServices>;
    }) => {
      const { error } = await supabase
        .from("user_service")
        .update(updates)
        .eq("service_id", serviceId);
      if (error) throw error;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userServices(userId),
      });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
    }: {
      serviceId: string;
      userId: string;
    }) => {
      const { error } = await supabase
        .from("user_service")
        .delete()
        .eq("service_id", serviceId);
      if (error) throw error;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userServices(userId),
      });
    },
  });
};
