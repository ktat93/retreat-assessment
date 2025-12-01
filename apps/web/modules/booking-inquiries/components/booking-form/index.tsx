"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@workspace/ui/components/form";
import {
  createBookingInquirySchema,
  type BookingInquiryFormData,
} from "../../schema";
import { getBookingInquiryFormValues } from "../../utils";
import { BookingDateField } from "../booking-date-field";
import type { Venue } from "@/modules/venues/types";

type BookingFormProps = {
  venue: Venue;
  onSubmitAction: (data: BookingInquiryFormData) => void;
  isSubmitting?: boolean;
};

export function BookingForm({
  venue,
  onSubmitAction,
  isSubmitting,
}: BookingFormProps) {
  const schema = useMemo(
    () => createBookingInquirySchema(venue.capacity),
    [venue.capacity],
  );

  const form = useForm<BookingInquiryFormData>({
    resolver: zodResolver(schema),
    defaultValues: getBookingInquiryFormValues(venue.id),
  });

  const handleSubmit = form.handleSubmit(onSubmitAction);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <BookingDateField
            control={form.control}
            name="startDate"
            label="Start Date"
            disabledDate={(date) => date < new Date()}
          />

          <BookingDateField
            control={form.control}
            name="endDate"
            label="End Date"
            disabledDate={(date) => {
              const startDate = form.getValues("startDate");
              if (date < new Date()) return true;
              if (startDate && date < new Date(startDate)) return true;
              return false;
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="attendeeCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Attendees</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter number of attendees"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Maximum capacity: {venue.capacity} guests
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
}
