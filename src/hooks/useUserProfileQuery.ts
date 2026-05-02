import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase-client";
import { queryKeys } from "@/lib/queryKeys";
import type { UserProfile } from "@/types/user";

export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data as UserProfile;
};

export const useUserProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.userProfile(userId!),
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      updates,
    }: {
      userId: string;
      updates: Partial<UserProfile>;
    }) => {
      const { error } = await supabase
        .from("user_profile")
        .update(updates)
        .eq("user_id", userId);
      if (error) throw error;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(userId),
      });
    },
  });
};
