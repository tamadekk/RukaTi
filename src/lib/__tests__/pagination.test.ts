import { describe, it, expect } from "bun:test";
import { calculatePaginationLogic } from "../pagination";

describe("calculatePaginationLogic", () => {
  describe("when totalPages <= MAX_VISIBLE_PAGES (5)", () => {
    it("shows all pages when there is only 1 page", () => {
      const result = calculatePaginationLogic(1, 1);
      expect(result).toEqual({
        start: 1,
        end: 1,
        shouldShowEllipsis: false,
        shouldShowLastPage: false,
      });
    });

    it("shows all pages when totalPages equals MAX_VISIBLE_PAGES", () => {
      const result = calculatePaginationLogic(3, 5);
      expect(result).toEqual({
        start: 1,
        end: 5,
        shouldShowEllipsis: false,
        shouldShowLastPage: false,
      });
    });

    it("shows all pages from page 1 when totalPages is 4", () => {
      const result = calculatePaginationLogic(1, 4);
      expect(result).toEqual({
        start: 1,
        end: 4,
        shouldShowEllipsis: false,
        shouldShowLastPage: false,
      });
    });
  });

  describe("when totalPages > MAX_VISIBLE_PAGES (6+)", () => {
    it("starts at page 1 when currentPage is near the beginning", () => {
      const result = calculatePaginationLogic(1, 6);
      expect(result.start).toBe(1);
      expect(result.end).toBe(3);
      expect(result.shouldShowLastPage).toBe(true);
    });

    it("does not show ellipsis when the window is adjacent to the last page", () => {
      const result = calculatePaginationLogic(4, 6);
      expect(result.start).toBe(3);
      expect(result.end).toBe(5);
      expect(result.shouldShowEllipsis).toBe(false);
      expect(result.shouldShowLastPage).toBe(true);
    });

    it("shows ellipsis when the window is far from the last page", () => {
      const result = calculatePaginationLogic(5, 20);
      expect(result.start).toBe(4);
      expect(result.end).toBe(7);
      expect(result.shouldShowEllipsis).toBe(true);
      expect(result.shouldShowLastPage).toBe(true);
    });

    it("does not show ellipsis when currentPage is near the end", () => {
      const result = calculatePaginationLogic(18, 20);
      expect(result.start).toBe(17);
      expect(result.end).toBe(19);
      expect(result.shouldShowEllipsis).toBe(false);
      expect(result.shouldShowLastPage).toBe(true);
    });

    it("clamps end below totalPages when currentPage is the last page", () => {
      const result = calculatePaginationLogic(20, 20);
      expect(result.end).toBeLessThan(20);
      expect(result.shouldShowLastPage).toBe(true);
    });

    it("never lets start fall below 1", () => {
      const result = calculatePaginationLogic(1, 10);
      expect(result.start).toBe(1);
    });
  });
});
