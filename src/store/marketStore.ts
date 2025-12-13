import supabase from "@/supabase-client";
import { create } from "zustand";
import type { UserServices, UserProfile } from "@/types/user";

type MarketStore = {
  loading: boolean;
  error: string | null;
  services: UserServices[];
  currentService: UserServices | null;
  providerProfile: UserProfile | null;

  providerServices: UserServices[];

  fetchAllServices: () => Promise<void>;
  fetchServiceDetails: (serviceId: string) => Promise<void>;
  fetchProviderDetails: (userId: string) => Promise<void>;
};

export const useMarketStore = create<MarketStore>((set) => ({
  loading: false,
  error: null,
  services: [],
  currentService: null,
  providerProfile: null,
  providerServices: [],

  fetchAllServices: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch all services, ordered by newest first
      const { data, error } = await supabase
        .from("user_services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      set({ services: data as UserServices[] });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
         set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchServiceDetails: async (serviceId: string) => {
    set({ loading: true, error: null, currentService: null, providerProfile: null });
    try {
      // 1. Fetch Service
      const { data: serviceData, error: serviceError } = await supabase
        .from("user_services")
        .select("*")
        .eq("service_id", serviceId)
        .single();

      if (serviceError) throw serviceError;
      set({ currentService: serviceData as UserServices });

      // 2. Fetch Provider Profile
      if (serviceData?.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", serviceData.user_id)
            .single();
            
          if (profileError) {
            console.error("Error fetching provider profile:", profileError);
          } else {
             set({ providerProfile: profileData as UserProfile });
          }
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
         set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchProviderDetails: async (userId: string) => {
    set({ loading: true, error: null, providerProfile: null, providerServices: [] });
    try {
        // 1. Fetch Profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profileError) throw profileError;
        set({ providerProfile: profileData as UserProfile });

        // 2. Fetch Services
        const { data: servicesData, error: servicesError } = await supabase
          .from("user_services")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (servicesError) throw servicesError;
        set({ providerServices: servicesData as UserServices[] });

    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
         set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
