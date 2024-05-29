import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      await this.prisma.feedback.create({
        data: createFeedbackDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, peerPage: number) {
    try {
      const skip = page > 0 ? peerPage * (page - 1) : 0;

      const [total, data] = await Promise.all([
        this.prisma.feedback.count({}),
        this.prisma.feedback.findMany({
          orderBy: { createdAt: 'desc' },
          take: peerPage,
          skip,
        }),
      ]);

      const lastPage = Math.ceil(total / peerPage);

      return {
        data,
        meta: {
          total,
          lastPage,
          currentPage: page,
          peerPage,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.feedback.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
