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

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type FilterOption = {
  value: string | number;
  label: string;
};

export type FilterSelectSize = "sm" | "md" | "lg";
