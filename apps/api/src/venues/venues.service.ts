import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { FindVenuesQuery } from './dto/venues-query.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { VenuesRepository } from './venues.repository';

@Injectable()
export class VenuesService {
  constructor(private readonly repository: VenuesRepository) {}

  async create(dto: CreateVenueDto) {
    return this.repository.create(dto);
  }

  async findAll(query: FindVenuesQuery) {
    return this.repository.findMany(query);
  }

  async findOne(id: string) {
    const venue = await this.repository.findUnique(id);

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    return venue;
  }

  async update(id: string, dto: UpdateVenueDto) {
    await this.findOne(id);

    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.repository.delete(id);
  }

  async checkAvailability(dto: CheckAvailabilityDto) {
    return this.repository.findAvailable(dto);
  }
}
