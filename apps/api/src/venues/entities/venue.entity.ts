import { Decimal } from '@prisma/client/runtime/client';
import { Venue as VenueRecord } from '../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Venue implements VenueRecord {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  pricePerNight: Decimal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
