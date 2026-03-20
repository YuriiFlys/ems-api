import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Category } from '../../../generated/prisma/client';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsEnum(Category)
  category: Category;
}
