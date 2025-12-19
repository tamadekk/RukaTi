import { MARKET_PAGINATION_CONFIG } from "@/const/market-pagination";

export interface PaginationLogic {
  start: number;
  end: number;
  shouldShowEllipsis: boolean;
  shouldShowLastPage: boolean;
}

export const calculatePaginationLogic = (
  currentPage: number,
  totalPages: number,
): PaginationLogic => {
  const showAllPages = totalPages <= MARKET_PAGINATION_CONFIG.MAX_VISIBLE_PAGES;

  const start = showAllPages
    ? MARKET_PAGINATION_CONFIG.FIRST_PAGE
    : Math.max(
        MARKET_PAGINATION_CONFIG.FIRST_PAGE,
        currentPage - MARKET_PAGINATION_CONFIG.PAGES_BEFORE_CURRENT,
      );

  const end = showAllPages
    ? totalPages
    : Math.min(
        totalPages - MARKET_PAGINATION_CONFIG.MIN_GAP_FOR_ELLIPSIS,
        currentPage + MARKET_PAGINATION_CONFIG.PAGES_AFTER_CURRENT,
      );

  const shouldShowEllipsis =
    !showAllPages &&
    end < totalPages - MARKET_PAGINATION_CONFIG.MIN_GAP_FOR_ELLIPSIS;

  const shouldShowLastPage = !showAllPages && end < totalPages;

  return {
    start,
    end,
    shouldShowEllipsis,
    shouldShowLastPage,
  };
};
