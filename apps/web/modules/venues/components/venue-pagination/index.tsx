"use client";

import { useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { getPaginationItems } from "../../utils";

type VenuePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
  disabled?: boolean;
};

export function VenuePagination({
  currentPage,
  totalPages,
  onPageChangeAction,
  disabled = false,
}: VenuePaginationProps) {
  const pages = useMemo(() => getPaginationItems(totalPages), [totalPages]);

  const handlePageClick = useCallback(
    (page: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (!disabled) {
        onPageChangeAction(page);
      }
    },
    [disabled, onPageChangeAction],
  );

  if (totalPages <= 1) {
    return null;
  }

  const isPrevDisabled = disabled || currentPage === 1;
  const isNextDisabled = disabled || currentPage === totalPages;

  const renderPageItem = (page: number) => {
    const isActive = page === currentPage;

    return (
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          isActive={isActive}
          onClick={handlePageClick(page)}
          aria-label={`Go to page ${page}`}
          aria-current={isActive ? "page" : undefined}
          aria-disabled={disabled && !isActive}
          className={disabled && !isActive ? "pointer-events-none opacity-50" : ""}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePageClick(currentPage - 1)}
            aria-disabled={isPrevDisabled}
            aria-label="Go to previous page"
            className={isPrevDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map(renderPageItem)}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handlePageClick(currentPage + 1)}
            aria-disabled={isNextDisabled}
            aria-label="Go to next page"
            className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
