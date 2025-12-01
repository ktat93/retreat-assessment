import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { VenuesService } from "./service";
import { VENUE_KEYS } from "./constants";
import type { VenuesQuery } from "./types";

export function useVenues(query?: VenuesQuery) {
  return useQuery({
    queryKey: VENUE_KEYS.list(query),
    queryFn: () => VenuesService.getAll(query),
    placeholderData: keepPreviousData,
  });
}
