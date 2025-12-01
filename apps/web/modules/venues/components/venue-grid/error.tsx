import { AlertCircle } from "lucide-react";

type VenueGridErrorProps = {
  message?: string;
};

export function VenueGridError({
  message = "Failed to load venues. Please try again later.",
}: VenueGridErrorProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
      <AlertCircle className="h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
