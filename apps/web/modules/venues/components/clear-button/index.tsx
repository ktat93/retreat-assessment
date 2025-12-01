"use client";

import { X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

type ClearButtonProps = {
  onClickAction: () => void;
};

export function ClearButton({ onClickAction }: ClearButtonProps) {
  return (
    <Button type="button" variant="outline" size="icon" onClick={onClickAction}>
      <X className="h-4 w-4" />
      <span className="sr-only">Clear filters</span>
    </Button>
  );
}
