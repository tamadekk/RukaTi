import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { calculatePaginationLogic } from "@/lib/pagination";

interface MarketPaginationItemsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const MarketPaginationItems = ({
  currentPage,
  totalPages,
  onPageChange,
}: MarketPaginationItemsProps) => {
  const { start, end, shouldShowEllipsis, shouldShowLastPage } =
    calculatePaginationLogic(currentPage, totalPages);

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const page = Number(e.currentTarget.dataset.page);
    onPageChange(page);
  };

  const items = [];

  for (let i = start; i <= end; i++) {
    items.push(
      <PaginationItem key={i}>
        <PaginationLink
          data-page={i}
          onClick={handlePageClick}
          isActive={currentPage === i}
          className="cursor-pointer"
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (shouldShowEllipsis) {
    items.push(<PaginationEllipsis key="ellipsis" />);
  }

  if (shouldShowLastPage) {
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          data-page={totalPages}
          onClick={handlePageClick}
          isActive={currentPage === totalPages}
          className="cursor-pointer"
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return <>{items}</>;
};
