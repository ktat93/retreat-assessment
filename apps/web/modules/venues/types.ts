export type Venue = {
  id: string;
  name: string;
  city: string;
  capacity: number;
  pricePerNight: string;
  createdAt: string;
  updatedAt: string;
};

export type VenuesQuery = {
  search?: string;
  city?: string;
  capacity?: number;
  maxPricePerNight?: number;
  page?: number;
  limit?: number;
};

export type AvailabilityQuery = {
  startDate: string;
  endDate: string;
  attendeeCount: number;
  city?: string;
};
