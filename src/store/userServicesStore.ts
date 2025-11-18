import { create } from "zustand";
import type { UserServices } from "@/types/user";

type ServiceStore = {
  loading: boolean;
  error: string | null;
  userServices: UserServices[] | null;

  setUserServices: (services: UserServices[] | null) => void;
  createService: (service: UserServices) => void;
};

export const useServiceStore = create<ServiceStore>((set) => ({
  loading: false,
  error: null,
  userServices: null,

  setUserServices: (services) => set({ userServices: services }),

  createService: (service) =>
    set((state) => ({
      userServices: state.userServices
        ? [...state.userServices, service]
        : [service],
    })),
}));
