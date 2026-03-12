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
  const {
    MAX_VISIBLE_PAGES,
    PAGES_BEFORE_CURRENT,
    PAGES_AFTER_CURRENT,
    MIN_GAP_FOR_ELLIPSIS,
    FIRST_PAGE,
  } = MARKET_PAGINATION_CONFIG;

  const showAllPages = totalPages <= MAX_VISIBLE_PAGES;

  const start = showAllPages
    ? FIRST_PAGE
    : Math.max(FIRST_PAGE, currentPage - PAGES_BEFORE_CURRENT);

  const end = showAllPages
    ? totalPages
    : Math.min(
        totalPages - MIN_GAP_FOR_ELLIPSIS,
        currentPage + PAGES_AFTER_CURRENT,
      );

  const shouldShowEllipsis =
    !showAllPages && end < totalPages - MIN_GAP_FOR_ELLIPSIS;

  const shouldShowLastPage = !showAllPages && end < totalPages;

  return {
    start,
    end,
    shouldShowEllipsis,
    shouldShowLastPage,
  };
};
