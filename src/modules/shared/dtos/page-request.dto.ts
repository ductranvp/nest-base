import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IPageRequest } from '@node-collection/nest-ready';

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
  @IsString()
  @ApiProperty({
    example: 'name=asc;createdAt=desc',
  })
  sort?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'name=example',
  })
  equalSearch?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'name=example',
  })
  includeSearch?: string;
}
