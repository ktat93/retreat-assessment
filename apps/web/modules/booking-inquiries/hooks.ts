import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingInquiriesService } from "./service";
import { BOOKING_INQUIRY_KEYS } from "./constants";
import type { CreateBookingInquiryData, UpdateBookingInquiryData } from "./types";

export function useBookingInquiries() {
  return useQuery({
    queryKey: BOOKING_INQUIRY_KEYS.list(),
    queryFn: () => BookingInquiriesService.getAll(),
  });
}

export function useBookingInquiry(id: string) {
  return useQuery({
    queryKey: BOOKING_INQUIRY_KEYS.detail(id),
    queryFn: () => BookingInquiriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBookingInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingInquiryData) =>
      BookingInquiriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_INQUIRY_KEYS.all });
    },
  });
}

export function useUpdateBookingInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingInquiryData }) =>
      BookingInquiriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_INQUIRY_KEYS.all });
    },
  });
}

export function useDeleteBookingInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BookingInquiriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_INQUIRY_KEYS.all });
    },
  });
}
