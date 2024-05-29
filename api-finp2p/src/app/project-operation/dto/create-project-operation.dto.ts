import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateProjectOperationDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}

