import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BookingInquiriesService } from './booking-inquiries.service';
import { CreateBookingInquiryDto } from './dto/create-booking-inquiry.dto';
import { UpdateBookingInquiryDto } from './dto/update-booking-inquiry.dto';
import { BookingInquiry } from './entities/booking-inquiry.entity';

@ApiTags('BookingInquiries')
@Controller('booking-inquiries')
export class BookingInquiriesController {
  constructor(
    private readonly bookingInquiriesService: BookingInquiriesService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: BookingInquiry })
  create(@Body() createBookingInquiryDto: CreateBookingInquiryDto) {
    return this.bookingInquiriesService.create(createBookingInquiryDto);
  }

  @Get()
  @ApiOkResponse({ type: [BookingInquiry] })
  findAll() {
    return this.bookingInquiriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookingInquiry })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.bookingInquiriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookingInquiry })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookingInquiryDto: UpdateBookingInquiryDto,
  ) {
    return this.bookingInquiriesService.update(id, updateBookingInquiryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.bookingInquiriesService.remove(id);
  }
}
