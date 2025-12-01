import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingInquiriesService } from "./service";
import { BOOKING_INQUIRY_KEYS } from "./constants";
import type { BookingInquiryFormData } from "./schema";

export function useCreateBookingInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingInquiryFormData) =>
      BookingInquiriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_INQUIRY_KEYS.all });
    },
  });
}
