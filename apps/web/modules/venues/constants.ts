import type { VenuesQuery } from "./types";

export const VENUE_KEYS = {
  all: ["venues"] as const,
  list: (query?: VenuesQuery) => [...VENUE_KEYS.all, "list", query] as const,
};
