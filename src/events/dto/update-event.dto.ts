import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Category } from '../../../generated/prisma/client';

export class UpdateEventDto {
  @ApiPropertyOptional({ example: 'Updated Tech Conference 2026', description: 'The title of the event' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description', description: 'The description of the event' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({ example: '2026-05-16T10:00:00Z', description: 'The date and time of the event' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: 'New Location, NY', description: 'The location of the event' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  @ApiPropertyOptional({ example: 40.7128, description: 'Latitude of the event location' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: -74.0060, description: 'Longitude of the event location' })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ enum: Category, description: 'The category of the event' })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;
}
