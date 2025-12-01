import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function VenueCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
}
