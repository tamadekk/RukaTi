import { describe, it, expect } from "bun:test";
import { userServiceReviewSchema } from "../service_review";

describe("userServiceReviewSchema", () => {
  describe("review_rating", () => {
    it("accepts rating of 1 (minimum)", () => {
      expect(
        userServiceReviewSchema.safeParse({ review_rating: 1 }).success,
      ).toBe(true);
    });

    it("accepts rating of 5 (maximum)", () => {
      expect(
        userServiceReviewSchema.safeParse({ review_rating: 5 }).success,
      ).toBe(true);
    });

    it("accepts rating of 3 with review text", () => {
      const result = userServiceReviewSchema.safeParse({
        review_rating: 3,
        review_text: "Great service!",
      });
      expect(result.success).toBe(true);
    });

    it("rejects rating of 0 (below minimum)", () => {
      expect(
        userServiceReviewSchema.safeParse({ review_rating: 0 }).success,
      ).toBe(false);
    });

    it("rejects rating of 6 (above maximum)", () => {
      expect(
        userServiceReviewSchema.safeParse({ review_rating: 6 }).success,
      ).toBe(false);
    });

    it("rejects non-integer rating", () => {
      expect(
        userServiceReviewSchema.safeParse({ review_rating: 2.5 }).success,
      ).toBe(false);
    });
  });

  describe("review_text", () => {
    it("accepts null review_text", () => {
      const result = userServiceReviewSchema.safeParse({
        review_rating: 4,
        review_text: null,
      });
      expect(result.success).toBe(true);
    });

    it("accepts input when review_text is omitted", () => {
      const result = userServiceReviewSchema.safeParse({ review_rating: 4 });
      expect(result.success).toBe(true);
    });
  });
});
