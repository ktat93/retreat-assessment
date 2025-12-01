"use client";

import { toast } from "@workspace/ui/components/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useCreateBookingInquiry } from "../../hooks";
import { BookingForm } from "../booking-form";
import type { BookingInquiryFormData } from "../../schema";
import type { Venue } from "@/modules/venues/types";
import { formatPrice } from "@/modules/venues/utils";

type BookingDialogProps = {
  venue: Venue | null;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export function BookingDialog({
  venue,
  open,
  onOpenChangeAction,
}: BookingDialogProps) {
  const createMutation = useCreateBookingInquiry();

  const handleSubmit = async (data: BookingInquiryFormData) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Booking inquiry submitted successfully!");
      onOpenChangeAction(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit inquiry";
      toast.error(message);
    }
  };

  if (!venue) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book {venue.name}</DialogTitle>
          <DialogDescription>
            {venue.city} &middot; Up to {venue.capacity} guests &middot;{" "}
            {formatPrice(venue.pricePerNight)}/night
          </DialogDescription>
        </DialogHeader>

        <BookingForm
          venue={venue}
          onSubmitAction={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
