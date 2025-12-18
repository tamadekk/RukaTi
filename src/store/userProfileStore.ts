import { create } from "zustand";
import supabase from "@/supabase-client";
import type { UserProfile } from "@/types/user";

type UserState = {
  userProfile: UserProfile | null;
  loading: boolean;
  fetchUserProfile: (id: string) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  clearUser: () => void;
};

export const useUserProfileStore = create<UserState>((set) => ({
  userProfile: null,
  loading: false,

  fetchUserProfile: async (id) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", id)
        .single();
      if (error) throw error;
      set({ userProfile: data });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateUserProfile: async (profile) => {
    set({ loading: true });
    try {
      const { userProfile } = useUserProfileStore.getState();
      if (!userProfile?.user_id) throw new Error("User ID not found");

      const { error } = await supabase
        .from("user_profiles")
        .update(profile)
        .eq("user_id", userProfile.user_id);

      if (error) throw error;

      set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, ...profile }
          : null,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => set({ userProfile: null }),
}));
