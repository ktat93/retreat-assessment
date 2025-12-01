import { type ReactNode } from "react";

type VenueGridProps = {
  children: ReactNode;
  className?: string;
};

const GRID_CLASSES = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export function VenueGrid({ children, className = "" }: VenueGridProps) {
  const classes = className ? `${GRID_CLASSES} ${className}` : GRID_CLASSES;

  return <div className={classes}>{children}</div>;
}
