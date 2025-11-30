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

export type CreateBookingInquiryData = {
  venueId: string;
  companyName: string;
  email: string;
  startDate: string;
  endDate: string;
  attendeeCount: number;
};

export type UpdateBookingInquiryData = {
  companyName?: string;
  email?: string;
  startDate?: string;
  endDate?: string;
  attendeeCount?: number;
};
