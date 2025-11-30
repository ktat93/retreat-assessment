import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { VenuesRepository } from './venues.repository';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService, VenuesRepository],
  exports: [VenuesRepository],
})
export class VenuesModule {}
