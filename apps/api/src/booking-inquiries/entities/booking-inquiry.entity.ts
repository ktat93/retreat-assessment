import { BookingInquiry as BookingInquiryRecord } from '../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BookingInquiry implements BookingInquiryRecord {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  venueId: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  attendeeCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
