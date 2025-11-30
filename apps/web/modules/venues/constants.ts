import type { VenuesQuery, AvailabilityQuery } from "./types";

export const VENUE_KEYS = {
  all: ["venues"] as const,
  list: (query?: VenuesQuery) => [...VENUE_KEYS.all, "list", query] as const,
  detail: (id: string) => [...VENUE_KEYS.all, "detail", id] as const,
  availability: (query: AvailabilityQuery) =>
    [...VENUE_KEYS.all, "availability", query] as const,
};
