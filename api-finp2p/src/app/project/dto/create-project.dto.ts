import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  status?: 'progress' | 'concluded';

  @IsOptional()
  @IsString()
  collectionMethod?: 'donation' | 'investment';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  amountRequired?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  amountCollected?: number;

  image?: Express.Multer.File;
}
