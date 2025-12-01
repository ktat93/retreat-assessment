import type { VenuesQuery } from "../types";

function setIfDefined(
  params: URLSearchParams,
  key: string,
  value: string | number | undefined,
) {
  if (value !== undefined && value !== null && value !== "") {
    params.set(key, String(value));
  }
}

export function buildVenuesQueryParams(query?: VenuesQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (!query) return params;

  setIfDefined(params, "search", query.search);
  setIfDefined(params, "city", query.city);
  setIfDefined(params, "capacity", query.capacity);
  setIfDefined(params, "maxPricePerNight", query.maxPricePerNight);
  setIfDefined(params, "page", query.page);
  setIfDefined(params, "limit", query.limit);

  return params;
}
