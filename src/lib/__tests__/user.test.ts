import { describe, it, expect } from "bun:test";
import { isUserOnboarded } from "../user";
import type { UserProfile } from "@/types/user";

const buildProfile = (overrides: Partial<UserProfile> = {}): UserProfile => ({
  user_id: "user-1",
  full_name: "Alice",
  phone_number: "+358401234567",
  bio: null,
  avatar: null,
  rating: null,
  profile_completed: true,
  created_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

describe("isUserOnboarded", () => {
  it("returns false when profile is null", () => {
    expect(isUserOnboarded(null)).toBe(false);
  });

  it("returns false when profile is undefined", () => {
    expect(isUserOnboarded(undefined)).toBe(false);
  });

  it("returns true when profile_completed is true", () => {
    expect(isUserOnboarded(buildProfile({ profile_completed: true }))).toBe(
      true,
    );
  });

  it("returns false when profile_completed is false", () => {
    expect(isUserOnboarded(buildProfile({ profile_completed: false }))).toBe(
      false,
    );
  });
});
