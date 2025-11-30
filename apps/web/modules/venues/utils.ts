import type { VenuesQuery, AvailabilityQuery } from "./types";

export function buildVenuesQueryParams(query?: VenuesQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (!query) {
    return params;
  }

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.city) {
    params.set("city", query.city);
  }

  if (query.capacity) {
    params.set("capacity", String(query.capacity));
  }

  if (query.maxPricePerNight) {
    params.set("maxPricePerNight", String(query.maxPricePerNight));
  }

  if (query.page) {
    params.set("page", String(query.page));
  }

  if (query.limit) {
    params.set("limit", String(query.limit));
  }

  return params;
}

export function buildAvailabilityQueryParams(query: AvailabilityQuery): URLSearchParams {
  const params = new URLSearchParams({
    startDate: query.startDate,
    endDate: query.endDate,
    attendeeCount: String(query.attendeeCount),
  });

  if (query.city) {
    params.set("city", query.city);
  }

  return params;
}
