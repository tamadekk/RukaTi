import type { User } from "@/types/user";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type SessionState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  //TODO: don't store refresh token in local storage & use httpOnly cookies instead
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useUserSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
