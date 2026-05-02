import { useQuery } from "@tanstack/react-query";
import supabase from "@/supabase-client";
import { queryKeys } from "@/lib/queryKeys";
import type { UserServices, UserProfile } from "@/types/user";

type MarketFilters = {
  selectedCategory: string | null;
  searchQuery: string;
  page: number;
  pageSize: number;
};

export const useMarketServices = (filters: MarketFilters) => {
  const { selectedCategory, searchQuery, page, pageSize } = filters;

  return useQuery({
    queryKey: queryKeys.marketServices(filters),
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("user_service")
        .select("*", { count: "exact" })
        .order("rating", { ascending: false, nullsFirst: false })
        .range(from, to);

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      if (searchQuery.trim()) {
        query = query.ilike("title", `%${searchQuery.trim()}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        services: (data as UserServices[]) ?? [],
        totalCount: count ?? 0,
      };
    },
  });
};

export const useServiceDetails = (serviceId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.serviceDetails(serviceId!),
    queryFn: async () => {
      const { data: serviceData, error: serviceError } = await supabase
        .from("user_service")
        .select("*")
        .eq("service_id", serviceId!)
        .single();

      if (serviceError) throw serviceError;

      const service = serviceData as UserServices;

      const { data: profileData } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", service.user_id)
        .single();

      return {
        service,
        providerProfile: (profileData as UserProfile) ?? null,
      };
    },
    enabled: !!serviceId,
  });
};

export const useProviderDetails = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.providerDetails(userId!),
    queryFn: async () => {
      const { data: profileData, error: profileError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", userId!)
        .single();

      if (profileError) throw profileError;

      const { data: servicesData, error: servicesError } = await supabase
        .from("user_service")
        .select("*")
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });

      if (servicesError) throw servicesError;

      return {
        profile: profileData as UserProfile,
        services: (servicesData as UserServices[]) ?? [],
      };
    },
    enabled: !!userId,
  });
};

export const useSimilarServices = (
  category: string | undefined,
  excludeId: string | undefined,
) => {
  return useQuery({
    queryKey: queryKeys.similarServices(category!, excludeId!),
    queryFn: async () => {
      const { data } = await supabase
        .from("user_service")
        .select("*")
        .eq("category", category!)
        .neq("service_id", excludeId!)
        .order("rating", { ascending: false, nullsFirst: false })
        .limit(4);
      return (data as UserServices[]) ?? [];
    },
    enabled: !!category && !!excludeId,
  });
};
