import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './lib/db';
import { VenuesModule } from './venues/venues.module';
import { BookingInquiriesModule } from './booking-inquiries/booking-inquiries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    VenuesModule,
    BookingInquiriesModule,
  ],
})
export class AppModule {}
