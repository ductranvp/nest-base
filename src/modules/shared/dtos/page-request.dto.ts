import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IPageRequest, IPaginationSort } from '../../../common';

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

  sort?: IPaginationSort;

  search?: Record<string, string>;
}
