"use client";

import { VenueFilters } from "../venue-filters";
import type { VenueFilterFormData } from "../../schema";
import type { Venue } from "../../types";

type FiltersSectionProps = {
  venues: Venue[];
  defaultValues: VenueFilterFormData;
  onChangeAction: (data: VenueFilterFormData) => void;
  onClearAction: () => void;
};

export function FiltersSection({
  venues,
  defaultValues,
  onChangeAction,
  onClearAction,
}: FiltersSectionProps) {
  return (
    <div className="mb-8">
      <VenueFilters
        venues={venues}
        defaultValues={defaultValues}
        onChangeAction={onChangeAction}
        onClearAction={onClearAction}
      />
    </div>
  );
}
