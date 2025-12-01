import { api } from "@/lib/api";
import { buildVenuesQueryParams } from "./utils";
import type { Venue, VenuesQuery, PaginatedResponse } from "./types";

export const VenuesService = {
  getAll(query?: VenuesQuery) {
    const params = buildVenuesQueryParams(query).toString();
    const queryString = params ? `?${params}` : "";
    return api.get<PaginatedResponse<Venue>>(`/venues${queryString}`);
  },
};
