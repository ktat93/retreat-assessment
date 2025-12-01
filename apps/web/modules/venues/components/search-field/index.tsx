"use client";

import { Search } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { FormControl, FormField, FormItem } from "@workspace/ui/components/form";
import type { Control } from "react-hook-form";
import type { VenueFilterFormData } from "../../schema";

type SearchFieldProps = {
  control: Control<VenueFilterFormData>;
  onFieldChangeAction: (field: keyof VenueFilterFormData, value: string) => void;
};

export function SearchField({ control, onFieldChangeAction }: SearchFieldProps) {
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
                  onFieldChangeAction("search", e.target.value);
                }}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
