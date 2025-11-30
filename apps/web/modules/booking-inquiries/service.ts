import { api } from "@/lib/api";
import type {
  BookingInquiry,
  CreateBookingInquiryData,
  UpdateBookingInquiryData,
} from "./types";

class Service {
  private static instance: Service;

  private constructor() {}

  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  getAll() {
    return api.get<BookingInquiry[]>("/booking-inquiries");
  }

  getById(id: string) {
    return api.get<BookingInquiry>(`/booking-inquiries/${id}`);
  }

  create(data: CreateBookingInquiryData) {
    return api.post<BookingInquiry>("/booking-inquiries", data);
  }

  update(id: string, data: UpdateBookingInquiryData) {
    return api.patch<BookingInquiry>(`/booking-inquiries/${id}`, data);
  }

  delete(id: string) {
    return api.delete<void>(`/booking-inquiries/${id}`);
  }
}

export const BookingInquiriesService = Service.getInstance();
