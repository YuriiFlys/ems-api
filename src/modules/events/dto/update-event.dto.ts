import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Category } from '../../../../generated/prisma/client';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;
}
