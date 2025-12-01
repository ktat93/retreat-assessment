"use client";

import { MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import type { Venue } from "../../types";
import { formatPrice } from "../../utils";

export { VenueCardSkeleton } from "./skeleton";

type VenueCardProps = {
  venue: Venue;
  onBook?: (venue: Venue) => void;
};

export function VenueCard({ venue, onBook }: VenueCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg">{venue.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{venue.city}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Users className="h-4 w-4" />
          <span>Up to {venue.capacity} guests</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div>
          <span className="text-lg font-semibold">{formatPrice(venue.pricePerNight)}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>
        {onBook && (
          <Button size="sm" onClick={() => onBook(venue)}>
            Book
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
