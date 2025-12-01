"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import type { Control } from "react-hook-form";
import type { BookingInquiryFormData } from "../../schema";

type BookingDateFieldProps = {
  control: Control<BookingInquiryFormData>;
  name: "startDate" | "endDate";
  label: string;
  disabledDate: (date: Date) => boolean;
};

export function BookingDateField({
  control,
  name,
  label,
  disabledDate,
}: BookingDateFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? format(new Date(field.value), "PPP")
                    : "Select a date"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) =>
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                }
                disabled={disabledDate}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
