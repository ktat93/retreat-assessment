import { useQuery } from "@tanstack/react-query";
import { VenuesService } from "./service";
import { VENUE_KEYS } from "./constants";
import type { VenuesQuery, AvailabilityQuery } from "./types";

export function useVenues(query?: VenuesQuery) {
  return useQuery({
    queryKey: VENUE_KEYS.list(query),
    queryFn: () => VenuesService.getAll(query),
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: VENUE_KEYS.detail(id),
    queryFn: () => VenuesService.getById(id),
    enabled: !!id,
  });
}

export function useVenueAvailability(query: AvailabilityQuery, enabled = true) {
  return useQuery({
    queryKey: VENUE_KEYS.availability(query),
    queryFn: () => VenuesService.checkAvailability(query),
    enabled:
      enabled && !!query.startDate && !!query.endDate && !!query.attendeeCount,
  });
}
