import type { Venue } from "../types";

type FilterOption = {
  value: string | number;
  label: string;
};

const DEFAULT_CAPACITY_OPTIONS = [100, 200, 350, 500, 750];
const DEFAULT_PRICE_OPTIONS = [4000, 6000, 8000, 10000, 12000];

export function getCityOptions(venues: Venue[]): FilterOption[] {
  const uniqueCities = [...new Set(venues.map((v) => v.city))].sort();

  return uniqueCities.map((city) => ({
    value: city,
    label: city,
  }));
}

export function getCapacityOptions(venues: Venue[]): FilterOption[] {
  const maxCapacity = venues.length > 0
    ? Math.max(...venues.map((v) => v.capacity))
    : Infinity;

  const options = DEFAULT_CAPACITY_OPTIONS.filter((cap) => cap <= maxCapacity);

  return options.map((value) => ({
    value,
    label: `${value}+ guests`,
  }));
}

export function getPriceOptions(venues: Venue[]): FilterOption[] {
  const maxPrice = venues.length > 0
    ? Math.max(...venues.map((v) => Number(v.pricePerNight)))
    : Infinity;

  const options = DEFAULT_PRICE_OPTIONS.filter((price) => price <= maxPrice);

  return options.map((value) => ({
    value,
    label: `Under $${value.toLocaleString()}`,
  }));
}

export type { FilterOption };
