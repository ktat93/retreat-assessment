import { Building2 } from "lucide-react";

type VenueGridEmptyProps = {
  title?: string;
  description?: string;
};

export function VenueGridEmpty({
  title = "No venues found",
  description = "Try adjusting your filters to find more venues",
}: VenueGridEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
      <Building2 className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    </div>
  );
}
