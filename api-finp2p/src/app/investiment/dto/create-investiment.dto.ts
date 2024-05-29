import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateInvestmentDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
