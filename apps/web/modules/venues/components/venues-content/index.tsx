"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVenues } from "../../hooks";
import type { VenueFilterFormData } from "../../schema";
import type { Venue } from "../../types";
import { parseVenueSearchParams, buildSearchParamsString } from "../../utils";
import { VenueFilters } from "../venue-filters";
import { VenueCard } from "../venue-card";
import { VenuePagination } from "../venue-pagination";
import { VenueGrid } from "../venue-grid";
import { VenueGridLoading } from "../venue-grid/loading";
import { VenueGridError } from "../venue-grid/error";
import { VenueGridEmpty } from "../venue-grid/empty";

const ITEMS_PER_PAGE = 12;

export function VenuesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const parsed = parseVenueSearchParams(searchParams);
    return { ...parsed, limit: ITEMS_PER_PAGE };
  }, [searchParams]);

  const { data, isLoading, isError, isFetching, isPlaceholderData } = useVenues(query);
  const allVenuesQuery = useVenues({ page: 1, limit: 1000 });

  const venues = data?.data ?? [];
  const meta = data?.meta;
  const filterVenues = allVenuesQuery.data?.data ?? [];

  const defaultFilterValues = useMemo<VenueFilterFormData>(
    () => ({
      search: query.search ?? "",
      city: query.city ?? "",
      capacity: query.capacity,
      maxPricePerNight: query.maxPricePerNight,
    }),
    [query.search, query.city, query.capacity, query.maxPricePerNight],
  );

  const updateUrl = (params: Record<string, string | number | undefined>) => {
    const queryString = buildSearchParamsString(
      new URLSearchParams(searchParams.toString()),
      params,
    );
    router.push(`/?${queryString}`);
  };

  const handleFilterChange = (formData: VenueFilterFormData) => {
    updateUrl({
      search: formData.search,
      city: formData.city,
      capacity: formData.capacity,
      maxPricePerNight: formData.maxPricePerNight,
      page: 1,
    });
  };

  const handleFilterClear = () => router.push("/");

  const handlePageChange = (page: number) => updateUrl({ ...query, page });

  return (
    <>
      <FiltersSection
        venues={filterVenues}
        defaultValues={defaultFilterValues}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
      />

      <ContentSection
        venues={venues}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isPlaceholderData={isPlaceholderData}
        onPageChange={handlePageChange}
      />
    </>
  );
}

type FiltersSectionProps = {
  venues: Venue[];
  defaultValues: VenueFilterFormData;
  onChange: (data: VenueFilterFormData) => void;
  onClear: () => void;
};

function FiltersSection({ venues, defaultValues, onChange, onClear }: FiltersSectionProps) {
  return (
    <div className="mb-8">
      <VenueFilters
        venues={venues}
        defaultValues={defaultValues}
        onChange={onChange}
        onClear={onClear}
      />
    </div>
  );
}

type ContentSectionProps = {
  venues: Venue[];
  meta: { total: number; page: number; totalPages: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isPlaceholderData: boolean;
  onPageChange: (page: number) => void;
};

function ContentSection({
  venues,
  meta,
  isLoading,
  isError,
  isFetching,
  isPlaceholderData,
  onPageChange,
}: ContentSectionProps) {
  if (isLoading) return <VenueGridLoading count={ITEMS_PER_PAGE} />;
  if (isError) return <VenueGridError />;
  if (venues.length === 0) return <VenueGridEmpty />;

  return (
    <>
      <ResultsInfo showing={venues.length} total={meta?.total ?? 0} isLoading={isFetching} />

      <VenueGrid className={isPlaceholderData ? "opacity-60" : ""}>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </VenueGrid>

      <div className="mt-8">
        <VenuePagination
          currentPage={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          onPageChange={onPageChange}
          disabled={isPlaceholderData}
        />
      </div>
    </>
  );
}

type ResultsInfoProps = {
  showing: number;
  total: number;
  isLoading: boolean;
};

function ResultsInfo({ showing, total, isLoading }: ResultsInfoProps) {
  return (
    <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
      <span>
        Showing {showing} of {total} venues
      </span>
      {isLoading && <span className="text-primary">(Loading...)</span>}
    </div>
  );
}
