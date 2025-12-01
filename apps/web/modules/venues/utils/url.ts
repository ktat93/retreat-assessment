import type { ReadonlyURLSearchParams } from "next/navigation";
import type { VenuesQuery } from "../types";

export function parseVenueSearchParams(
  searchParams: ReadonlyURLSearchParams
): VenuesQuery & { page: number } {
  return {
    search: searchParams.get("search") || undefined,
    city: searchParams.get("city") || undefined,
    capacity: searchParams.get("capacity")
      ? Number(searchParams.get("capacity"))
      : undefined,
    maxPricePerNight: searchParams.get("maxPricePerNight")
      ? Number(searchParams.get("maxPricePerNight"))
      : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  };
}

export function buildSearchParamsString(
  currentParams: URLSearchParams,
  updates: Record<string, string | number | undefined | null>
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      newParams.set(key, String(value));
    } else {
      newParams.delete(key);
    }
  });

  return newParams.toString();
}
