import { z } from "zod";

export const bookingInquirySchema = z.object({
  venueId: z.string().uuid("Please select a venue"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  attendeeCount: z.number().min(1, "Attendee count must be at least 1"),
});

export type BookingInquiryFormData = z.infer<typeof bookingInquirySchema>;
