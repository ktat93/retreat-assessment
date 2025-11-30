import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { FindVenuesQuery } from './dto/venues-query.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { Venue } from './entities/venue.entity';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiCreatedResponse({ type: Venue })
  async create(@Body() createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  @ApiOkResponse({ type: [Venue] })
  async findAll(@Query() query: FindVenuesQuery): Promise<Venue[]> {
    return this.venuesService.findAll(query);
  }

  @Get('availability')
  @ApiOkResponse({ type: [Venue] })
  async checkAvailability(
    @Query() dto: CheckAvailabilityDto,
  ): Promise<Venue[]> {
    return this.venuesService.checkAvailability(dto);
  }

  @Get(':id')
  @ApiOkResponse({ type: Venue })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Venue> {
    return this.venuesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Venue })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.venuesService.remove(id);
  }
}
