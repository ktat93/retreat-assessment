import type { VenuesQuery } from "./types";
import type { VenueFilterFormData } from "./schema";

export const VENUE_KEYS = {
  all: ["venues"] as const,
  list: (query?: VenuesQuery) => [...VENUE_KEYS.all, "list", query] as const,
};

export const FILTER_SELECT_ALL_VALUE = "all";

export const FILTER_SELECT_SIZE_CLASSES = {
  sm: "w-[120px]",
  md: "w-[140px]",
  lg: "w-[160px]",
} as const;

export const EMPTY_FILTER_VALUES: VenueFilterFormData = {
  search: "",
  city: "",
  capacity: undefined,
  maxPricePerNight: undefined,
};

export const VENUES_PER_PAGE = 12;

export const DEFAULT_CAPACITY_OPTIONS = [100, 200, 350, 500, 750];

export const DEFAULT_PRICE_OPTIONS = [4000, 6000, 8000, 10000, 12000];
