import { useState, useCallback } from "react";

const RECENTLY_VIEWED_STORAGE_KEY = "rukati_recently_viewed";
const RECENTLY_VIEWED_MAX_COUNT = 6;

function loadRecentlyViewedIds(): string[] {
  try {
    return JSON.parse(
      localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY) ?? "[]",
    );
  } catch {
    return [];
  }
}

function saveRecentlyViewedIds(serviceIds: string[]) {
  localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(serviceIds));
}

export const useRecentlyViewed = () => {
  const [recentlyViewedServiceIds, setRecentlyViewedIds] = useState<string[]>(
    loadRecentlyViewedIds,
  );

  const addToRecentlyViewed = useCallback((serviceId: string) => {
    setRecentlyViewedIds((currentIds) => {
      const updatedIds = [
        serviceId,
        ...currentIds.filter((id) => id !== serviceId),
      ].slice(0, RECENTLY_VIEWED_MAX_COUNT);
      saveRecentlyViewedIds(updatedIds);
      return updatedIds;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    saveRecentlyViewedIds([]);
    setRecentlyViewedIds([]);
  }, []);

  return { recentlyViewedServiceIds, addToRecentlyViewed, clearRecentlyViewed };
};
