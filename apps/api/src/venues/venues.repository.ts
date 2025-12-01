import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../lib/db';
import { FindVenuesQuery } from './dto/venues-query.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenuesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateVenueDto) {
    return this.prisma.venue.create({ data });
  }

  async findMany(query: FindVenuesQuery) {
    const where = this.buildWhereClause(query);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.venue.findMany({
        skip,
        take: limit,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.venue.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findUnique(id: string) {
    return this.prisma.venue.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateVenueDto) {
    return this.prisma.venue.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.venue.delete({ where: { id } });
  }

  async findAvailable(dto: CheckAvailabilityDto) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const where: Prisma.VenueWhereInput = {
      capacity: { gte: dto.attendeeCount },
      bookingInquiries: {
        none: {
          AND: [{ startDate: { lt: endDate } }, { endDate: { gt: startDate } }],
        },
      },
    };

    if (dto.city) {
      where.city = { equals: dto.city, mode: 'insensitive' };
    }

    return this.prisma.venue.findMany({
      where,
      orderBy: { pricePerNight: 'asc' },
    });
  }

  private buildWhereClause(filters: FindVenuesQuery): Prisma.VenueWhereInput {
    const where: Prisma.VenueWhereInput = {};

    if (filters.search) {
      where.name = { contains: filters.search, mode: 'insensitive' };
    }

    if (filters.city) {
      where.city = { equals: filters.city, mode: 'insensitive' };
    }

    if (filters.capacity !== undefined) {
      where.capacity = { gte: filters.capacity };
    }

    if (filters.maxPricePerNight !== undefined) {
      where.pricePerNight = { lte: filters.maxPricePerNight };
    }

    return where;
  }
}
