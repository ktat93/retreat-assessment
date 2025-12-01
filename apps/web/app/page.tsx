import { Suspense } from "react";
import Link from "next/link";
import { VenuesContent } from "@/modules/venues/components/venues-content";
import { VenueGridLoading } from "@/modules/venues/components/venue-grid/loading";

export const metadata = {
  title: "Retreat",
  description: "Find the perfect venue for your corporate retreat",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader />

      <Suspense fallback={<VenueGridLoading />}>
        <VenuesContent />
      </Suspense>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <Link href="/" className="hover:text-primary transition-colors">
          Venues
        </Link>
      </h1>
      <p className="text-muted-foreground mt-2">
        Find the perfect venue for your corporate retreat
      </p>
    </div>
  );
}
