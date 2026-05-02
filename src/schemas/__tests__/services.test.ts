import { describe, it, expect } from "bun:test";
import { ServiceSchema } from "../services";

const VALID_SERVICE = {
  title: "Fix leaky tap",
  description: "I repair all kinds of household plumbing issues.",
  category: "Plumbing",
  price_range: "50–100€",
  availability: "Weekdays",
};

describe("ServiceSchema", () => {
  describe("valid inputs", () => {
    it("accepts a fully populated valid service", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        location: "Helsinki",
        contact: "+358401234567",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a service without optional fields", () => {
      expect(ServiceSchema.safeParse(VALID_SERVICE).success).toBe(true);
    });
  });

  describe("title", () => {
    it("rejects title shorter than 3 characters", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        title: "Ab",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("description", () => {
    it("rejects description shorter than 10 characters", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        description: "Too short",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("category", () => {
    it("rejects category shorter than 2 characters", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        category: "X",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("price_range", () => {
    it("rejects empty price_range", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        price_range: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("availability", () => {
    it("rejects empty availability", () => {
      const result = ServiceSchema.safeParse({
        ...VALID_SERVICE,
        availability: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("optional fields", () => {
    it("accepts service without location", () => {
      const { location: _, ...withoutLocation } = {
        ...VALID_SERVICE,
        location: "Helsinki",
      };
      expect(ServiceSchema.safeParse(withoutLocation).success).toBe(true);
    });

    it("accepts service without contact", () => {
      const { contact: _, ...withoutContact } = {
        ...VALID_SERVICE,
        contact: "info@example.com",
      };
      expect(ServiceSchema.safeParse(withoutContact).success).toBe(true);
    });
  });
});
