import supabase from "@/supabase-client";
import { create } from "zustand";
import type { UserServices } from "@/types/user";

type MarketStore = {
  loading: boolean;
  error: string | null;
  services: UserServices[];

  fetchAllServices: () => Promise<void>;
};

export const useMarketStore = create<MarketStore>((set) => ({
  loading: false,
  error: null,
  services: [],

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
}));
