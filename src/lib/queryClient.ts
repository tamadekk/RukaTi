import { QueryClient } from "@tanstack/react-query";

const ONE_MINUTE = 1000 * 60;

export const STALE_TIME = {
  SHORT: ONE_MINUTE * 2,
  MEDIUM: ONE_MINUTE * 5,
  LONG: ONE_MINUTE * 10,
} as const;

export const GC_TIME = {
  DEFAULT: ONE_MINUTE * 5,
  MEDIUM: ONE_MINUTE * 10,
  LONG: ONE_MINUTE * 15,
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME.SHORT,
      gcTime: GC_TIME.DEFAULT,
    },
  },
});
