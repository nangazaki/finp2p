import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
  ConflictException,
} from '@nestjs/common';
import { CreateInvestmentDto } from './dto/update-investiment.dto';

import { randomUUID } from 'node:crypto';
import { generateReferenceNumber } from 'src/helpers/generateReference.helper';

import { PrismaService } from 'src/libs/prisma/prisma.service';
import { supabase } from 'src/libs/supabase';

@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId, createInvestmentDto: CreateInvestmentDto) {
    try {
      const reference = await this.prisma.referencePayment.findUnique({
        where: { reference: Number(createInvestmentDto.reference) },
        include: { project: true },
      });

      if (!reference) {
        throw new NotFoundException(
          'Não foi possível encontrar a referencia do pagamento!',
        );
      }

      const imgPath = randomUUID();
      const filePath = `finp2p/investimentos/${imgPath}`;
      const { error } = await supabase.storage
        .from('uploads')
        .upload(filePath, createInvestmentDto.comprovante.buffer, {
          contentType: createInvestmentDto.comprovante.mimetype,
        });

      if (error) {
        throw new UnsupportedMediaTypeException(
          'Erro ao fazer upload da imagem',
        );
      }

      await this.prisma.investment.create({
        data: {
          userId: userId,
          projectId: reference.projectId,
          amount: reference.amount,
          comporvativo: imgPath,
        },
      });

      await this.prisma.project.update({
        where: { id: reference.projectId },
        data: {
          amountCollected: Number(reference.amount),
        },
      });

      await this.prisma.referencePayment.update({
        where: { reference: Number(createInvestmentDto.reference) },
        data: {
          wasPaid: true,
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async generateReference(userId: string, createReference: any) {
    try {
      const proj = await this.prisma.project.findUnique({
        where: { id: createReference.projectId },
        include: {
          entity: true,
        },
      });

      if (userId === proj.entity.userId) {
        throw new BadRequestException('Não pode investir no seu Projecto!');
      }

      let refer = generateReferenceNumber();

      const references = await this.prisma.referencePayment.findMany();

      references.map((r) => {
        if (r.reference === refer) refer = generateReferenceNumber();
      });

      const { reference: r } = await this.prisma.referencePayment.create({
        data: {
          userId,
          projectId: createReference.projectId,
          reference: refer,
          amount: createReference.amount,
        },
      });

      return r;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.investment.findMany();
    } catch (error) {
      throw new BadRequestException(
        `Failed to find investments: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const investment = await this.prisma.investment.findUnique({
        where: { id },
      });

      if (!investment) {
        throw new NotFoundException(`Investment with id ${id} not found`);
      }

      return investment;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find investment with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const investment = await this.prisma.investment.findUnique({
        where: { id },
      });

      if (!investment) {
        throw new NotFoundException(`Investment with id ${id} not found`);
      }

      return await this.prisma.investment.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete investment with id ${id}: ${error.message}`,
      );
    }
  }
}
