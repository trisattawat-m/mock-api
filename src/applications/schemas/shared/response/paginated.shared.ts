import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PaginationResponse<T> {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  perPage: number;

  @Expose()
  @ApiProperty()
  totalItems: number;

  @Expose()
  @ApiProperty()
  totalPages: number;

  @Expose()
  @ApiProperty({ isArray: true })
  @Type(() => Object)
  data: T[];

  constructor(page = 1, perPage = 20, totalItems: number, data: T[]) {
    const totalPages = Math.ceil(totalItems / perPage);

    this.page = page;
    this.perPage = perPage;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.data = data;
  }
}
