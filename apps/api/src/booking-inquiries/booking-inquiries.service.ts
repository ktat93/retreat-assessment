import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateBookingInquiryDto } from './dto/create-booking-inquiry.dto';
import { UpdateBookingInquiryDto } from './dto/update-booking-inquiry.dto';
import { BookingInquiriesRepository } from './booking-inquiries.repository';
import { VenuesRepository } from '../venues/venues.repository';

@Injectable()
export class BookingInquiriesService {
  constructor(
    private readonly repository: BookingInquiriesRepository,
    private readonly venuesRepository: VenuesRepository,
  ) {}

  async create(dto: CreateBookingInquiryDto) {
    const venue = await this.venuesRepository.findUnique(dto.venueId);

    if (!venue) {
      throw new NotFoundException(`Venue not found`);
    }

    if (dto.attendeeCount > venue.capacity) {
      throw new BadRequestException(`Attendee count exceeds venue capacity`);
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    this.validateDateRange(startDate, endDate);
    await this.checkAvailability(dto.venueId, startDate, endDate);

    return this.repository.create(dto);
  }

  async findAll() {
    return this.repository.findMany();
  }

  async findOne(id: string) {
    const inquiry = await this.repository.findUnique(id);

    if (!inquiry) {
      throw new NotFoundException(`Booking inquiry not found`);
    }

    return inquiry;
  }

  async update(id: string, dto: UpdateBookingInquiryDto) {
    const inquiry = await this.findOne(id);

    const startDate = dto.startDate
      ? new Date(dto.startDate)
      : inquiry.startDate;

    const endDate = dto.endDate ? new Date(dto.endDate) : inquiry.endDate;

    if (dto.startDate || dto.endDate) {
      this.validateDateRange(startDate, endDate);
      await this.checkAvailability(inquiry.venueId, startDate, endDate, id);
    }

    if (
      dto.attendeeCount !== undefined &&
      dto.attendeeCount > inquiry.venue.capacity
    ) {
      throw new BadRequestException(`Attendee count exceeds venue capacity`);
    }

    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }

  private validateDateRange(startDate: Date, endDate: Date): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    if (endDate <= startDate) {
      throw new BadRequestException('End date must be after start date');
    }
  }

  private async checkAvailability(
    venueId: string,
    startDate: Date,
    endDate: Date,
    excludeInquiryId?: string,
  ): Promise<void> {
    const hasOverlap = await this.repository.hasOverlappingBooking(
      venueId,
      startDate,
      endDate,
      excludeInquiryId,
    );

    if (hasOverlap) {
      throw new ConflictException(
        'Venue is not available for the selected dates',
      );
    }
  }
}
