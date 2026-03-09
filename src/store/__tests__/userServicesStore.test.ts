import mockSupabase from "@/__tests__/mocks/supabase";
import { mock, describe, it, expect, beforeEach, spyOn } from "bun:test";

// Mock the supabase client module before any other imports
mock.module("@/supabase-client", () => ({
  default: mockSupabase,
}));

import { useServiceStore } from "../userServicesStore";
import type { UserServices } from "@/types/user";

describe("userServicesStore", () => {
  beforeEach(() => {
    // Clear the store before each test
    useServiceStore.setState({
      userServices: null,
      loading: false,
      error: null,
    });
  });

  it("should have initial state", () => {
    const state = useServiceStore.getState();
    expect(state.userServices).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should create a service locally", () => {
    const newService: UserServices = {
      service_id: "s1",
      user_id: "u1",
      title: "New Service",
      description: "Desc",
      category: "Cat",
      location: "Loc",
      contact: "123",
      price_range: "$",
      availability: "Always",
      rating: 0,
      created_at: new Date().toISOString(),
    };

    useServiceStore.getState().createService(newService);

    expect(useServiceStore.getState().userServices).toHaveLength(1);
    expect(useServiceStore.getState().userServices![0]).toEqual(newService);
  });

  it("should fetch user services and update state", async () => {
    const mockData = [
      { service_id: "s1", title: "Service 1" },
      { service_id: "s2", title: "Service 2" },
    ];

    // Mock the supabase response
    spyOn(mockSupabase, "from").mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: mockData, error: null }),
      }),
    } as any);

    await useServiceStore.getState().fetchUserServices("u1");

    const state = useServiceStore.getState();
    expect(state.loading).toBe(false);
    expect(state.userServices).toEqual(mockData as any);
    expect(state.error).toBeNull();
  });

  it("should handle error during fetch", async () => {
    const mockError = new Error("Fetch failed");

    spyOn(mockSupabase, "from").mockReturnValue({
      select: () => ({
        eq: () => Promise.reject(mockError),
      }),
    } as any);

    await useServiceStore.getState().fetchUserServices("u1");

    const state = useServiceStore.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Fetch failed");
    expect(state.userServices).toBeNull();
  });

  it("should update a service", async () => {
    const initialServices: UserServices[] = [
      { service_id: "s1", title: "Old Title" } as any,
    ];
    useServiceStore.setState({ userServices: initialServices });

    spyOn(mockSupabase, "from").mockReturnValue({
      update: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    } as any);

    await useServiceStore
      .getState()
      .updateService("s1", { title: "New Title" });

    const state = useServiceStore.getState();
    expect(state.userServices![0].title).toBe("New Title");
  });

  it("should delete a service", async () => {
    const initialServices: UserServices[] = [
      { service_id: "s1", title: "Service 1" } as any,
      { service_id: "s2", title: "Service 2" } as any,
    ];
    useServiceStore.setState({ userServices: initialServices });

    spyOn(mockSupabase, "from").mockReturnValue({
      delete: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    } as any);

    await useServiceStore.getState().deleteService("s1");

    const state = useServiceStore.getState();
    expect(state.userServices).toHaveLength(1);
    expect(state.userServices![0].service_id).toBe("s2");
  });
});
