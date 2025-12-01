"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "@workspace/ui/components/sonner";
import { useVenues } from "../../hooks";
import type { VenueFilterFormData } from "../../schema";
import type { Venue } from "../../types";
import { parseVenueSearchParams, buildSearchParamsString } from "../../utils";
import { VENUES_PER_PAGE } from "../../constants";
import { FiltersSection } from "../filters-section";
import { ContentSection } from "../content-section";
import { BookingDialog } from "@/modules/booking-inquiries/components/booking-dialog";

export function VenuesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const query = useMemo(() => {
    const parsed = parseVenueSearchParams(searchParams);
    return { ...parsed, limit: VENUES_PER_PAGE };
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

  const handleBookVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsBookingDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsBookingDialogOpen(open);
    if (!open) {
      setSelectedVenue(null);
    }
  };

  return (
    <>
      <FiltersSection
        venues={filterVenues}
        defaultValues={defaultFilterValues}
        onChangeAction={handleFilterChange}
        onClearAction={handleFilterClear}
      />

      <ContentSection
        venues={venues}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isPlaceholderData={isPlaceholderData}
        itemsPerPage={VENUES_PER_PAGE}
        onPageChangeAction={handlePageChange}
        onBookAction={handleBookVenue}
      />

      <BookingDialog
        venue={selectedVenue}
        open={isBookingDialogOpen}
        onOpenChangeAction={handleDialogClose}
      />

      <Toaster position="top-right" />
    </>
  );
}
