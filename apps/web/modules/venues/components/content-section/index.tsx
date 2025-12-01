"use client";

import { VenueCard } from "../venue-card";
import { VenuePagination } from "../venue-pagination";
import { VenueGrid } from "../venue-grid";
import { VenueGridLoading } from "../venue-grid/loading";
import { VenueGridError } from "../venue-grid/error";
import { VenueGridEmpty } from "../venue-grid/empty";
import { ResultsInfo } from "../results-info";
import type { Venue } from "../../types";

type ContentSectionProps = {
  venues: Venue[];
  meta: { total: number; page: number; totalPages: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isPlaceholderData: boolean;
  itemsPerPage: number;
  onPageChangeAction: (page: number) => void;
  onBookAction: (venue: Venue) => void;
};

export function ContentSection({
  venues,
  meta,
  isLoading,
  isError,
  isFetching,
  isPlaceholderData,
  itemsPerPage,
  onPageChangeAction,
  onBookAction,
}: ContentSectionProps) {
  if (isLoading) {
    return <VenueGridLoading count={itemsPerPage} />;
  }

  if (isError) {
    return <VenueGridError />;
  }

  if (venues.length === 0) {
    return <VenueGridEmpty />;
  }

  return (
    <>
      <ResultsInfo
        showing={venues.length}
        total={meta?.total ?? 0}
        isLoading={isFetching}
      />

      <VenueGrid className={isPlaceholderData ? "opacity-60" : ""}>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} onBookAction={onBookAction} />
        ))}
      </VenueGrid>

      <div className="mt-8">
        <VenuePagination
          currentPage={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          onPageChangeAction={onPageChangeAction}
          disabled={isPlaceholderData}
        />
      </div>
    </>
  );
}
