import { create } from "zustand";
import type { UserProfile } from "@/types/user";

type UserProfileStore = {
  setUserProfile: (user: UserProfile) => void;
  userProfile: UserProfile | null;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  setUserProfile: (user: UserProfile) => set({ userProfile: user }),
  userProfile: null,
}));
