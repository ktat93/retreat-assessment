import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingInquiryDto } from './create-booking-inquiry.dto';

export class UpdateBookingInquiryDto extends PartialType(CreateBookingInquiryDto) {}
