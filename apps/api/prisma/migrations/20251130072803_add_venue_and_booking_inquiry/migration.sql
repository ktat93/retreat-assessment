-- CreateTable
CREATE TABLE "venues" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "pricePerNight" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_inquiries" (
    "id" UUID NOT NULL,
    "venueId" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "attendeeCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "venues_city_idx" ON "venues"("city");

-- CreateIndex
CREATE INDEX "venues_capacity_idx" ON "venues"("capacity");

-- CreateIndex
CREATE INDEX "venues_pricePerNight_idx" ON "venues"("pricePerNight");

-- CreateIndex
CREATE INDEX "booking_inquiries_email_idx" ON "booking_inquiries"("email");

-- CreateIndex
CREATE INDEX "booking_inquiries_venueId_idx" ON "booking_inquiries"("venueId");

-- CreateIndex
CREATE INDEX "booking_inquiries_startDate_endDate_idx" ON "booking_inquiries"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "booking_inquiries_createdAt_idx" ON "booking_inquiries"("createdAt");

-- AddForeignKey
ALTER TABLE "booking_inquiries" ADD CONSTRAINT "booking_inquiries_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
