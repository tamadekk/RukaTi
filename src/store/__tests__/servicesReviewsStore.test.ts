import mockSupabase from "@/__tests__/mocks/supabase";
import { mock, describe, it, expect, beforeEach, spyOn } from "bun:test";

// Mock the supabase client module before any other imports
mock.module("@/supabase-client", () => ({
  default: mockSupabase,
}));

import { useServicesReviewsStore } from "../servicesReviewsStore";
import type { Review, UploadReview } from "@/types/user";

describe("servicesReviewsStore", () => {
  beforeEach(() => {
    useServicesReviewsStore.setState({
      reviews: [],
    });
  });

  it("should have initial state", () => {
    const state = useServicesReviewsStore.getState();
    expect(state.reviews).toEqual([]);
  });

  it("should load reviews", async () => {
    const mockData = [
      { review_id: "r1", review_text: "Great", user_id: "u1" },
      { review_id: "r2", review_text: "Good", user_id: "u2" },
    ];

    spyOn(mockSupabase, "from").mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: mockData, error: null }),
      }),
    } as any);

    await useServicesReviewsStore.getState().loadReviews("s1");

    const state = useServicesReviewsStore.getState();
    expect(state.reviews).toEqual(mockData as any);
  });

  it("should upload a review", async () => {
    const newReview: UploadReview = {
      review_id: "r3",
      user_id: "u3",
      service_id: "s1",
      review_rating: 5,
      review_text: "Excellent",
      created_at: new Date().toISOString(),
    };

    const mockProfileData = {
      ...newReview,
      user_profile: { full_name: "Test User", avatar: "avatar.png" },
    };

    const fromSpy = spyOn(mockSupabase, "from");

    // Setup sequential mocks for insert then select.single
    fromSpy.mockImplementation((table: string) => {
      return {
        insert: () => Promise.resolve({ error: null }),
        select: () => ({
          eq: () => ({
            single: () =>
              Promise.resolve({ data: mockProfileData, error: null }),
          }),
        }),
      } as any;
    });

    await useServicesReviewsStore.getState().uploadReview(newReview);

    const state = useServicesReviewsStore.getState();
    expect(state.reviews).toHaveLength(1);
    expect(state.reviews[0]).toEqual(mockProfileData as any);
  });

  it("should update a review", async () => {
    const initialReviews: Review[] = [
      {
        review_id: "r1",
        review_text: "Okay",
        review_rating: 3,
        user_id: "u1",
      } as any,
    ];
    useServicesReviewsStore.setState({ reviews: initialReviews });

    spyOn(mockSupabase, "from").mockReturnValue({
      update: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    } as any);

    await useServicesReviewsStore
      .getState()
      .updateReview("r1", { review_text: "Better", review_rating: 4 });

    const state = useServicesReviewsStore.getState();
    expect(state.reviews[0].review_text).toBe("Better");
    expect(state.reviews[0].review_rating).toBe(4);
  });

  it("should delete a review", async () => {
    const initialReviews: Review[] = [
      { review_id: "r1", review_text: "Okay" } as any,
      { review_id: "r2", review_text: "Good" } as any,
    ];
    useServicesReviewsStore.setState({ reviews: initialReviews });

    spyOn(mockSupabase, "from").mockReturnValue({
      delete: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    } as any);

    await useServicesReviewsStore.getState().deleteReview("r1");

    const state = useServicesReviewsStore.getState();
    expect(state.reviews).toHaveLength(1);
    expect(state.reviews[0].review_id).toBe("r2");
  });
});
