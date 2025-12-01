import type { BookingInquiryFormData } from "../schema";

export function getBookingInquiryFormValues(venueId: string): BookingInquiryFormData {
  return {
    venueId,
    companyName: "",
    email: "",
    startDate: "",
    endDate: "",
    attendeeCount: 1,
  };
}
