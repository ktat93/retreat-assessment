import { Module } from '@nestjs/common';
import { BookingInquiriesService } from './booking-inquiries.service';
import { BookingInquiriesController } from './booking-inquiries.controller';
import { BookingInquiriesRepository } from './booking-inquiries.repository';
import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [VenuesModule],
  controllers: [BookingInquiriesController],
  providers: [BookingInquiriesService, BookingInquiriesRepository],
})
export class BookingInquiriesModule {}
