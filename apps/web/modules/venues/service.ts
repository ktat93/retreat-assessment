import { api } from "@/lib/api";
import { buildVenuesQueryParams } from "./utils";
import type { Venue, VenuesQuery, PaginatedResponse } from "./types";

class Service {
  private static instance: Service;

  private constructor() {}

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  getAll(query?: VenuesQuery) {
    const params = buildVenuesQueryParams(query).toString();
    const queryString = params ? `?${params}` : "";
    return api.get<PaginatedResponse<Venue>>(`/venues${queryString}`);
  }
}

export const VenuesService = Service.getInstance();
