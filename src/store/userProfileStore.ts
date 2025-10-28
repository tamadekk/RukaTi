import { create } from "zustand";
import supabase from "@/supabase-client";
import type { UserProfile } from "@/types/user";

type UserState = {
  userProfile: UserProfile | null;
  loading: boolean;
  fetchUserProfile: (id: string) => Promise<void>;
  clearUser: () => void;
};

export const useUserProfileStore = create<UserState>((set) => ({
  userProfile: null,
  loading: false,

  fetchUserProfile: async (id) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", id)
      .single();
    if (error) console.error("Error fetching profile:", error);
    set({ userProfile: data || null, loading: false });
  },

  clearUser: () => set({ userProfile: null }),
}));
