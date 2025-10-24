import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationRequest } from '../shared/request/pagination.shared';
import { ApiProperty } from '@nestjs/swagger';

export class Axles {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  left_weight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  right_weight?: number;
}

export class CentralizeCenterWimRequest extends PaginationRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  crossingIndexCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  datetime?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  plate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  plate_province?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total_axles?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total_length?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total_width?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  outcome?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total_weight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight_limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vehicle_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vehicle_class?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lane?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  overview_image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  plate_image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Axles)
  axles?: Axles[];
}
