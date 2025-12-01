import { api } from "@/lib/api";
import type { BookingInquiry } from "./types";
import type { BookingInquiryFormData } from "./schema";

class Service {
  private static instance: Service;

  private constructor() {}

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  create(data: BookingInquiryFormData) {
    return api.post<BookingInquiry>("/booking-inquiries", data);
  }
}

export const BookingInquiriesService = Service.getInstance();
