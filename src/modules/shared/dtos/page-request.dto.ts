import { IsArray, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IPageRequest } from '../../../common/mongoose/interfaces/IPageRequest';

export class PageRequestDto implements IPageRequest {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    example: 1,
  })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    example: 10,
  })
  pageSize?: number;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  sort?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  search?: string[];
}
