import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { supabase } from 'src/libs/supabase';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { v4 as uuidv4 } from 'uuid';
import { ProjectStatus } from '@prisma/client';
import { generateReferenceNumber } from 'src/helpers/generateReference.helper';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    try {
      if (
        createProjectDto.amountRequired > 20000000 ||
        createProjectDto.amountRequired < 0
      ) {
        throw new BadRequestException(
          'O valor do projecto deve estar entre 20M e 500K',
        );
      }

      if (!createProjectDto.image) {
        throw new Error('Imagem não fornecida');
      }

      const imageId = uuidv4();
      const filePath = `finp2p/${imageId}`;
      const { error } = await supabase.storage
        .from('uploads')
        .upload(filePath, createProjectDto.image.buffer, {
          contentType: createProjectDto.image.mimetype,
        });

      if (error) {
        throw new UnsupportedMediaTypeException(
          'Erro ao fazer upload da imagem',
        );
      }

      const { id } = await this.prisma.entity.findUnique({
        where: { userId: userId },
      });

      if (!id) {
        throw new NotFoundException('Entidade não encontrada');
      }

      const pj = await this.prisma.project.create({
        data: {
          image: imageId,
          name: createProjectDto.name,
          description: createProjectDto.description,
          type: createProjectDto.type,
          amountRequired: createProjectDto.amountRequired,
          amountCollected: 0,
          status: 'progress',
          local: 'Não informado',
          collectionMethod: 'investment',
          entity: {
            connect: {
              id,
            },
          },
        },
      });

      await this.prisma.referencePaymentFromProjectToSystem.create({
        data: {
          amount: this.calculateInterest(pj.amountRequired),
          projectId: pj.id,
          reference: generateReferenceNumber(),
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async findAllApproved() {
    try {
      return await this.prisma.project.findMany({
        where: { isApproved: true },
        include: {
          entity: true,
        },
      });
    } catch (error) {
      console.error(`Erro ao buscar todos os projetos: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.project.findMany({
        where: { isApproved: true },
      });
    } catch (error) {
      console.error(`Erro ao buscar todos os projetos: ${error.message}`);
      throw error;
    }
  }

  async findMyProjects(userId) {
    try {
      const { Project: projects } = await this.prisma.entity.findUnique({
        where: { userId },
        include: { Project: true },
      });

      return projects;
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      return await this.prisma.project.findUnique({
        where: { id },
        include: { ReferencePaymentFromProjectToSystem: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch (error) {
      console.error(`Erro ao remover o projeto com ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findPendingProjects() {
    try {
      return await this.prisma.project.findMany({
        where: { isApproved: false },
      });
    } catch (error) {
      console.error(`Erro ao buscar projetos pendentes: ${error.message}`);
      throw error;
    }
  }

  async findApprovedProjects() {
    try {
      const approvedProjects = await this.prisma.project.findMany({
        where: { isApproved: true },
      });
      console.log(`Projetos aprovados encontrados: ${approvedProjects.length}`);
      return approvedProjects;
    } catch (error) {
      console.error(`Erro ao buscar projetos aprovados: ${error.message}`);
      throw error;
    }
  }

  async findRejectedProjects() {
    try {
      const rejectedProjects = await this.prisma.project.findMany({
        where: { isApproved: false },
        include: { entity: true },
      });

      return rejectedProjects;
    } catch (error) {
      throw error;
    }
  }

  async approveProject(id: string) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: { isApproved: true },
      });
    } catch (error) {
      console.error(`Erro ao aprovar o projeto com ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async rejectProject(id: string, reason: string) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: {
          status: ProjectStatus.concluded,
          rejectionReason: reason,
          isApproved: false,
        },
      });
    } catch (error) {
      console.error(
        `Erro ao rejeitar o projeto com ID ${id}: ${error.message}`,
      );
      throw error;
    }
  }

  async createPayment(userId, createPayment) {
    try {
      const { id } =
        await this.prisma.referencePaymentFromProjectToSystem.findUnique({
          where: { reference: Number(createPayment.reference) },
        });

      const { amountRequired, amountCollected } =
        await this.prisma.project.findUnique({
          where: { id: createPayment.projectId },
        });

      if (amountCollected < amountRequired) {
        throw new ForbiddenException(
          'Só pode começar a pagar depoisde receber o investimento',
        );
      }

      const imageId = uuidv4();
      const filePath = `finp2p/payment-to-plataform/${imageId}`;
      const { error } = await supabase.storage
        .from('uploads')
        .upload(filePath, createPayment.comprovativo.buffer, {
          contentType: createPayment.comprovativo.mimetype,
        });

      if (error) {
        throw new UnsupportedMediaTypeException(
          'Erro ao fazer upload da imagem',
        );
      }

      await this.prisma.paymentInstallments.create({
        data: {
          amount: Number(createPayment.amount),
          referencePaymentFromProjectToSystemId: id,
          comprovativo: imageId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async stats() {
    const [approveds, rejeitecds, total, entities] = await Promise.all([
      this.prisma.project.count({
        where: { isApproved: true },
      }),
      this.prisma.project.count({
        where: { isApproved: false },
      }),
      this.prisma.project.count(),
      this.prisma.entity.count(),
      this.prisma.referencePaymentFromProjectToSystem.count(),
      this.prisma.paymentInstallments.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    return {
      approveds,
      rejeitecds,
      total,
      entities,
    };
  }

  calculateInterest(amount: number) {
    const interest = amount * 0.19;
    return amount + interest;
  }
}
