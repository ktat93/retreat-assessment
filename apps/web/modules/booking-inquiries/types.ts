import type { Venue } from "../venues/types";

export type BookingInquiry = {
  id: string;
  venueId: string;
  companyName: string;
  email: string;
  startDate: string;
  endDate: string;
  attendeeCount: number;
  createdAt: string;
  updatedAt: string;
  venue?: Venue;
};
