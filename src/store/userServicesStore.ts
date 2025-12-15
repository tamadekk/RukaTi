import supabase from "@/supabase-client";
import { create } from "zustand";
import type { UserServices } from "@/types/user";

type ServiceStore = {
  loading: boolean;
  error: string | null;
  userServices: UserServices[] | null;

  setUserServices: (services: UserServices[] | null) => void;
  createService: (service: UserServices) => void;
  fetchUserServices: (userId: string) => Promise<void>;
  updateService: (
    serviceId: string,
    updates: Partial<UserServices>,
  ) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
};

export const useServiceStore = create<ServiceStore>((set) => ({
  loading: false,
  error: null,
  userServices: null,

  setUserServices: (services: UserServices[] | null) =>
    set({ userServices: services }),

  createService: (service: UserServices) =>
    set((state) => ({
      userServices: state.userServices
        ? [...state.userServices, service]
        : [service],
    })),

  fetchUserServices: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("user_services")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      set({ userServices: data as UserServices[] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateService: async (serviceId: string, updates: Partial<UserServices>) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("user_services")
        .update(updates)
        .eq("service_id", serviceId);

      if (error) throw error;

      set((state) => ({
        userServices:
          state.userServices?.map((service) =>
            service.service_id === serviceId
              ? { ...service, ...updates }
              : service,
          ) || null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteService: async (serviceId: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from("user_services")
        .delete()
        .eq("service_id", serviceId);

      if (error) throw error;

      set((state) => ({
        userServices:
          state.userServices?.filter(
            (service) => service.service_id !== serviceId,
          ) || null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
