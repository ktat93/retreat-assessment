"use client";

import { VenueCardSkeleton } from "../venue-card-skeleton";
import { VenueGrid } from "./index";

type VenueGridLoadingProps = {
  count?: number;
};

export function VenueGridLoading({ count = 12 }: VenueGridLoadingProps) {
  return (
    <VenueGrid>
      {Array.from({ length: count }, (_, i) => (
        <VenueCardSkeleton key={i} />
      ))}
    </VenueGrid>
  );
}
