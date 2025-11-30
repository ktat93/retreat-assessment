import { z } from "zod";

export const venueFilterSchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  capacity: z.number().min(1).optional(),
  maxPricePerNight: z.number().min(0).optional(),
});

export type VenueFilterFormData = z.infer<typeof venueFilterSchema>;
