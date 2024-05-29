import { Module } from '@nestjs/common';
import { ProjectOperationService } from './project-operation.service';
import { ProjectOperationController } from './project-operation.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [ProjectOperationController],
  providers: [ProjectOperationService, PrismaService],
})
export class ProjectOperationModule {}
