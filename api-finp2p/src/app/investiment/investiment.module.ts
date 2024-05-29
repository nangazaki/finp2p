import { Module } from '@nestjs/common';
import { InvestmentService } from './investiment.service';
import { InvestmentController } from './investiment.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, PrismaService],
})
export class InvestimentModule {}
