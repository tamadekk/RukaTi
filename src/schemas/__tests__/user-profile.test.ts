import { describe, it, expect } from "bun:test";
import { OnboardingSchema } from "../user-profile";

const VALID_MINIMAL = {
  full_name: "Al",
  phone_number: "1234567",
};

describe("OnboardingSchema", () => {
  describe("valid inputs", () => {
    it("accepts minimal valid input without bio", () => {
      expect(OnboardingSchema.safeParse(VALID_MINIMAL).success).toBe(true);
    });

    it("accepts full valid input with bio", () => {
      const result = OnboardingSchema.safeParse({
        full_name: "Jane Smith",
        phone_number: "+358 40 123 4567",
        bio: "I'm a skilled carpenter.",
      });
      expect(result.success).toBe(true);
    });

    it("accepts phone numbers in various valid formats", () => {
      const validPhones = [
        "+358401234567",
        "+358 40 123 4567",
        "07912-345678",
        "(555) 123-4567",
        "0401234567",
      ];
      for (const phone_number of validPhones) {
        const result = OnboardingSchema.safeParse({
          ...VALID_MINIMAL,
          phone_number,
        });
        expect(result.success).toBe(true);
      }
    });

    it("accepts bio that is exactly 300 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        bio: "a".repeat(300),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("full_name validation", () => {
    it("rejects full_name shorter than 2 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        full_name: "A",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Full name must be at least 2 characters",
        );
      }
    });

    it("rejects full_name longer than 80 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        full_name: "A".repeat(81),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("phone_number validation", () => {
    it("rejects phone_number shorter than 7 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        phone_number: "12345",
      });
      expect(result.success).toBe(false);
    });

    it("rejects phone_number longer than 20 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        phone_number: "1".repeat(21),
      });
      expect(result.success).toBe(false);
    });

    it("rejects phone_number with letters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        phone_number: "123abc7890",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("bio validation", () => {
    it("accepts input when bio is omitted", () => {
      expect(OnboardingSchema.safeParse(VALID_MINIMAL).success).toBe(true);
    });

    it("rejects bio longer than 300 characters", () => {
      const result = OnboardingSchema.safeParse({
        ...VALID_MINIMAL,
        bio: "a".repeat(301),
      });
      expect(result.success).toBe(false);
    });
  });
});
