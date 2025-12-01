"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem } from "@workspace/ui/components/form";
import { venueFilterSchema, type VenueFilterFormData } from "../../schema";
import type { Venue } from "../../types";
import { getCityOptions, getCapacityOptions, getPriceOptions } from "../../utils";
import { FilterSelect } from "../filter-select";

type VenueFiltersProps = {
  venues: Venue[];
  defaultValues?: VenueFilterFormData;
  onChange: (data: VenueFilterFormData) => void;
  onClear: () => void;
};

const EMPTY_FILTER_VALUES: VenueFilterFormData = {
  search: "",
  city: "",
  capacity: undefined,
  maxPricePerNight: undefined,
};

export function VenueFilters({
  venues,
  defaultValues,
  onChange,
  onClear,
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
  }, [
    reset,
    defaultValues?.search,
    defaultValues?.city,
    defaultValues?.capacity,
    defaultValues?.maxPricePerNight,
  ]);

  const cityOptions = useMemo(() => getCityOptions(venues), [venues]);
  const capacityOptions = useMemo(() => getCapacityOptions(venues), [venues]);
  const priceOptions = useMemo(() => getPriceOptions(venues), [venues]);

  const { search, city, capacity, maxPricePerNight } = watch();
  const hasFilters = search || city || capacity || maxPricePerNight;

  const handleClear = () => {
    reset(EMPTY_FILTER_VALUES);
    onClear();
  };

  const handleFieldChange = (
    field: keyof VenueFilterFormData,
    value: string | number | undefined,
  ) => {
    onChange({ ...getValues(), [field]: value });
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SearchField control={control} onFieldChange={handleFieldChange} />

          <div className="flex flex-wrap items-center gap-3">
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FilterSelect
                    value={field.value}
                    onChange={(val) => {
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
                    onChange={(val) => {
                      field.onChange(val);
                      handleFieldChange("capacity", val as number | undefined);
                    }}
                    options={capacityOptions}
                    placeholder="Capacity"
                    allLabel="Any Capacity"
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
                    onChange={(val) => {
                      field.onChange(val);
                      handleFieldChange("maxPricePerNight", val as number | undefined);
                    }}
                    options={priceOptions}
                    placeholder="Max Price"
                    allLabel="Any Price"
                  />
                </FormItem>
              )}
            />

            {hasFilters && <ClearButton onClick={handleClear} />}
          </div>
        </div>
      </form>
    </Form>
  );
}

type SearchFieldProps = {
  control: ReturnType<typeof useForm<VenueFilterFormData>>["control"];
  onFieldChange: (field: keyof VenueFilterFormData, value: string) => void;
};

function SearchField({ control, onFieldChange }: SearchFieldProps) {
  return (
    <FormField
      control={control}
      name="search"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <div className="relative">
              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search venues..."
                className="pl-9"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onFieldChange("search", e.target.value);
                }}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type ClearButtonProps = {
  onClick: () => void;
};

function ClearButton({ onClick }: ClearButtonProps) {
  return (
    <Button type="button" variant="outline" size="icon" onClick={onClick}>
      <X className="h-4 w-4" />
      <span className="sr-only">Clear filters</span>
    </Button>
  );
}
