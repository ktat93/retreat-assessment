import type { Venue, FilterOption } from "../types";
import {
  DEFAULT_CAPACITY_OPTIONS,
  DEFAULT_PRICE_OPTIONS,
} from "../constants";

export function getCityOptions(venues: Venue[]): FilterOption[] {
  const cityCounts = venues.reduce<Record<string, number>>((acc, venue) => {
    acc[venue.city] = (acc[venue.city] || 0) + 1;
    return acc;
  }, {});

  const sortedCities = Object.keys(cityCounts).sort();

  return sortedCities.map((city) => ({
    value: city,
    label: `${city} (${cityCounts[city]})`,
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

