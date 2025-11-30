import {
  IsUUID,
  IsString,
  IsEmail,
  IsDateString,
  IsInt,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingInquiryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  venueId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  attendeeCount: number;
}
