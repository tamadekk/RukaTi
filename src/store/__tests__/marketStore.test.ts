import { describe, it, expect, beforeEach } from "bun:test";
import { useMarketStore } from "../marketStore";

const DEFAULT_PAGE_SIZE = 9;

beforeEach(() => {
  useMarketStore.setState({
    selectedCategory: null,
    searchQuery: "",
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
});

describe("useMarketStore", () => {
  describe("initial state", () => {
    it("has no selected category", () => {
      expect(useMarketStore.getState().selectedCategory).toBeNull();
    });

    it("has empty search query", () => {
      expect(useMarketStore.getState().searchQuery).toBe("");
    });

    it("starts on page 1", () => {
      expect(useMarketStore.getState().page).toBe(1);
    });

    it("has a page size of 9", () => {
      expect(useMarketStore.getState().pageSize).toBe(DEFAULT_PAGE_SIZE);
    });
  });

  describe("setSelectedCategory", () => {
    it("sets the selected category", () => {
      useMarketStore.getState().setSelectedCategory("tech");
      expect(useMarketStore.getState().selectedCategory).toBe("tech");
    });

    it("resets page to 1 when category changes", () => {
      useMarketStore.getState().setPage(3);
      useMarketStore.getState().setSelectedCategory("tech");
      expect(useMarketStore.getState().page).toBe(1);
    });

    it("accepts null to clear the category", () => {
      useMarketStore.getState().setSelectedCategory("tech");
      useMarketStore.getState().setSelectedCategory(null);
      expect(useMarketStore.getState().selectedCategory).toBeNull();
    });
  });

  describe("setSearchQuery", () => {
    it("sets the search query", () => {
      useMarketStore.getState().setSearchQuery("plumber");
      expect(useMarketStore.getState().searchQuery).toBe("plumber");
    });

    it("resets page to 1 when search query changes", () => {
      useMarketStore.getState().setPage(5);
      useMarketStore.getState().setSearchQuery("carpenter");
      expect(useMarketStore.getState().page).toBe(1);
    });
  });

  describe("setPage", () => {
    it("updates the current page", () => {
      useMarketStore.getState().setPage(4);
      expect(useMarketStore.getState().page).toBe(4);
    });

    it("does not affect other state when only page changes", () => {
      useMarketStore.getState().setSelectedCategory("tech");
      useMarketStore.getState().setSearchQuery("drill");
      useMarketStore.getState().setPage(2);

      const state = useMarketStore.getState();
      expect(state.selectedCategory).toBe("tech");
      expect(state.searchQuery).toBe("drill");
      expect(state.page).toBe(2);
    });
  });
});
