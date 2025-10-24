import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from '../shared/request/pagination.shared';
import { ApiProperty } from '@nestjs/swagger';
import { EcmWimSearchFields } from '../shared/enums/ecm-wim-search.enum';

export class EcmWimSearchRequest extends PaginationRequest {
  @ApiProperty({ enum: EcmWimSearchFields })
  @IsEnum(EcmWimSearchFields)
  searchBy: EcmWimSearchFields;

  @ApiProperty()
  @IsString()
  searchValue?: string;
}
