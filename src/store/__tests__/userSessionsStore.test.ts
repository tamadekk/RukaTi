import { describe, it, expect, beforeEach } from "bun:test";
import { useUserSession } from "../userSessionsStore";
import type { User } from "@/types/user";

describe("userSessionsStore", () => {
  beforeEach(() => {
    useUserSession.getState().logout();
  });

  it("should have initial state", () => {
    const state = useUserSession.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it("should set user", () => {
    const mockUser = { id: "test-user-id", email: "test@example.com" } as User;
    useUserSession.getState().setUser(mockUser);

    expect(useUserSession.getState().user).toEqual(mockUser);
  });

  it("should set tokens", () => {
    const accessToken = "access-token";
    const refreshToken = "refresh-token";
    useUserSession.getState().setTokens(accessToken, refreshToken);

    expect(useUserSession.getState().accessToken).toBe(accessToken);
    expect(useUserSession.getState().refreshToken).toBe(refreshToken);
  });

  it("should clear state on logout", () => {
    const mockUser = { id: "test-user-id", email: "test@example.com" } as User;
    const { setUser, setTokens, logout } = useUserSession.getState();

    setUser(mockUser);
    setTokens("access", "refresh");
    logout();

    const state = useUserSession.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });
});
