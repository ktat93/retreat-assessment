"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@workspace/ui/components/form";
import { venueFilterSchema, type VenueFilterFormData } from "../../schema";
import type { Venue } from "../../types";
import { EMPTY_FILTER_VALUES } from "../../constants";
import {
  getCityOptions,
  getCapacityOptions,
  getPriceOptions,
} from "../../utils";
import { FilterSelect } from "../filter-select";
import { SearchField } from "../search-field";
import { ClearButton } from "../clear-button";

type VenueFiltersProps = {
  venues: Venue[];
  defaultValues?: VenueFilterFormData;
  onChangeAction: (data: VenueFilterFormData) => void;
  onClearAction: () => void;
};

export function VenueFilters({
  venues,
  defaultValues,
  onChangeAction,
  onClearAction,
}: VenueFiltersProps) {
  const form = useForm<VenueFilterFormData>({
    resolver: zodResolver(venueFilterSchema),
    defaultValues: { ...EMPTY_FILTER_VALUES, ...defaultValues },
  });

  const { reset, watch, getValues, control } = form;

  useEffect(() => {
    reset({
      ...EMPTY_FILTER_VALUES,
      ...defaultValues,
    });
  }, [reset, defaultValues]);

  const cityOptions = useMemo(() => getCityOptions(venues), [venues]);
  const capacityOptions = useMemo(() => getCapacityOptions(venues), [venues]);
  const priceOptions = useMemo(() => getPriceOptions(venues), [venues]);

  const { search, city, capacity, maxPricePerNight } = watch();
  const hasFilters = search || city || capacity || maxPricePerNight;

  const handleClear = () => {
    reset(EMPTY_FILTER_VALUES);
    onClearAction();
  };

  const handleFieldChange = (
    field: keyof VenueFilterFormData,
    value: string | number | undefined,
  ) => {
    onChangeAction({ ...getValues(), [field]: value });
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SearchField
            control={control}
            onFieldChangeAction={handleFieldChange}
          />

          <div className="flex flex-wrap items-center gap-3">
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FilterSelect
                    value={field.value}
                    onChangeAction={(val) => {
                      field.onChange(val ?? "");
                      handleFieldChange("city", val ?? "");
                    }}
                    options={cityOptions}
                    placeholder="All Cities"
                    allLabel="All Cities"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FilterSelect
                    value={field.value}
                    onChangeAction={(val) => {
                      field.onChange(val);
                      handleFieldChange("capacity", val as number | undefined);
                    }}
                    options={capacityOptions}
                    placeholder="Capacity"
                    allLabel="Capacity"
                    size="sm"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="maxPricePerNight"
              render={({ field }) => (
                <FormItem>
                  <FilterSelect
                    value={field.value}
                    onChangeAction={(val) => {
                      field.onChange(val);
                      handleFieldChange(
                        "maxPricePerNight",
                        val as number | undefined,
                      );
                    }}
                    options={priceOptions}
                    placeholder="Max Price"
                    allLabel="Any Price"
                  />
                </FormItem>
              )}
            />

            {hasFilters && <ClearButton onClickAction={handleClear} />}
          </div>
        </div>
      </form>
    </Form>
  );
}
