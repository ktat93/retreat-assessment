import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../lib/db';
import { CreateBookingInquiryDto } from './dto/create-booking-inquiry.dto';
import { UpdateBookingInquiryDto } from './dto/update-booking-inquiry.dto';

@Injectable()
export class BookingInquiriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingInquiryDto) {
    return this.prisma.bookingInquiry.create({
      data: {
        companyName: dto.companyName,
        email: dto.email,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        attendeeCount: dto.attendeeCount,
        venue: {
          connect: { id: dto.venueId },
        },
      },
    });
  }

  async findMany() {
    return this.prisma.bookingInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: { venue: true },
    });
  }

  async findUnique(id: string) {
    return this.prisma.bookingInquiry.findUnique({
      where: { id },
      include: { venue: true },
    });
  }

  async update(id: string, dto: UpdateBookingInquiryDto) {
    return this.prisma.bookingInquiry.update({
      where: { id },
      data: this.prepareUpdateData(dto),
    });
  }

  async delete(id: string) {
    return this.prisma.bookingInquiry.delete({ where: { id } });
  }

  async hasOverlappingBooking(
    venueId: string,
    startDate: Date,
    endDate: Date,
    excludeInquiryId?: string,
  ): Promise<boolean> {
    const overlapping = await this.prisma.bookingInquiry.findFirst({
      where: {
        venueId,
        id: excludeInquiryId ? { not: excludeInquiryId } : undefined,
        AND: [{ startDate: { lt: endDate } }, { endDate: { gt: startDate } }],
      },
    });

    return overlapping !== null;
  }

  private prepareUpdateData(
    dto: UpdateBookingInquiryDto,
  ): Prisma.BookingInquiryUpdateInput {
    return {
      ...dto,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    };
  }
}
