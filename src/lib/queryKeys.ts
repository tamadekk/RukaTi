type MarketFilters = {
  selectedCategory: string | null;
  searchQuery: string;
  page: number;
  pageSize: number;
};

export const queryKeys = {
  userProfile: (userId: string) => ["userProfile", userId] as const,
  userServices: (userId: string) => ["userServices", userId] as const,
  marketServices: (filters: MarketFilters) =>
    ["marketServices", filters] as const,
  serviceDetails: (serviceId: string) => ["serviceDetails", serviceId] as const,
  providerDetails: (userId: string) => ["providerDetails", userId] as const,
  similarServices: (category: string, excludeId: string) =>
    ["similarServices", category, excludeId] as const,
  serviceReviews: (serviceId: string) => ["serviceReviews", serviceId] as const,
  recentlyViewedServices: (serviceIds: string[]) =>
    ["recentlyViewedServices", serviceIds] as const,
  chatRooms: (userId: string) => ["chatRooms", userId] as const,
  chatMessages: (roomId: string) => ["chatMessages", roomId] as const,
};
