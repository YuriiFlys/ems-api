import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Category } from '../../../generated/prisma/client';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Conference 2026', description: 'The title of the event' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A huge tech conference in the city', description: 'The description of the event' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2026-05-15T10:00:00Z', description: 'The date and time of the event' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Conference Center, NY', description: 'The location of the event' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ example: 40.7128, description: 'Latitude of the event location' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: -74.0060, description: 'Longitude of the event location' })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ enum: Category, description: 'The category of the event' })
  @IsEnum(Category)
  category: Category;
}
