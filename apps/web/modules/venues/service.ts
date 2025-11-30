import { api } from "@/lib/api";
import { buildVenuesQueryParams, buildAvailabilityQueryParams } from "./utils";
import type { Venue, VenuesQuery, AvailabilityQuery } from "./types";

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
    return api.get<Venue[]>(`/venues${params.length ? `?${params}` : ""}`);
  }

  getById(id: string) {
    return api.get<Venue>(`/venues/${id}`);
  }

  checkAvailability(query: AvailabilityQuery) {
    const params = buildAvailabilityQueryParams(query).toString();
    return api.get<Venue[]>(`/venues/availability?${params}`);
  }
}

export const VenuesService = Service.getInstance();
