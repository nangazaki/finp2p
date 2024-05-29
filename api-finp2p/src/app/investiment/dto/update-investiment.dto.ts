import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  name: string;
  email: string;
  reference: number;
  comprovante: Express.Multer.File;
}
