export const BOOKING_INQUIRY_KEYS = {
  all: ["booking-inquiries"] as const,
  list: () => [...BOOKING_INQUIRY_KEYS.all, "list"] as const,
  detail: (id: string) => [...BOOKING_INQUIRY_KEYS.all, "detail", id] as const,
};
