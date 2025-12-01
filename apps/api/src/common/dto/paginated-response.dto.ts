import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}

export class PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export function PaginatedResponseDto<T>(classRef: Type<T>): Type<PaginatedResponse<T>> {
  class PaginatedResponseClass {
    @ApiProperty({ type: [classRef] })
    data: T[];

    @ApiProperty({ type: PaginationMeta })
    meta: PaginationMeta;
  }

  return PaginatedResponseClass as Type<PaginatedResponse<T>>;
}
