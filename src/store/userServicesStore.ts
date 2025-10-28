import { create } from "zustand";
import type { UserServices } from "@/types/user";

type UserState = {
  userServices: UserServices[] | null;
  setUserServices: (services: UserServices[] | null) => void;
};

export const useUserServices = create<UserState>((set) => ({
  userServices: null,
  setUserServices: (services) => set({ userServices: services }),
}));
