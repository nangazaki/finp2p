import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './app/user/user.module';

import { PrismaService } from './libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProjectOperationModule } from './app/project-operation/project-operation.module';
import { ProjectModule } from './app/project/project.module';
import { InvestimentModule } from './app/investiment/investiment.module';
import { FeedbackModule } from './app/feedback/feedback.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectOperationModule,
    ProjectModule,
    InvestimentModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService],
})
export class AppModule {}
