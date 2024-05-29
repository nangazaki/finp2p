import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProjectOperationDto } from './dto/create-project-operation.dto';
import { UpdateProjectOperationDto } from './dto/update-project-operation.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class ProjectOperationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectOperationDto: CreateProjectOperationDto) {
    const { projectId } = createProjectOperationDto;

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    try {
      return await this.prisma.projectOperation.create({
        data: createProjectOperationDto,
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to create project operation: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.projectOperation.findMany();
    } catch (error) {
      throw new BadRequestException(
        `Failed to find project operations: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const projectOperation = await this.prisma.projectOperation.findUnique({
        where: { id },
      });

      if (!projectOperation) {
        throw new NotFoundException(
          `Project operation with id ${id} not found`,
        );
      }

      return projectOperation;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find project operation with id ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateProjectOperationDto: UpdateProjectOperationDto,
  ) {
    try {
      const projectOperation = await this.prisma.projectOperation.findUnique({
        where: { id },
      });

      if (!projectOperation) {
        throw new NotFoundException(
          `Project operation with id ${id} not found`,
        );
      }

      if (updateProjectOperationDto.projectId) {
        const project = await this.prisma.project.findUnique({
          where: { id: updateProjectOperationDto.projectId },
        });

        if (!project) {
          throw new NotFoundException(
            `Project with id ${updateProjectOperationDto.projectId} not found`,
          );
        }
      }

      return await this.prisma.projectOperation.update({
        where: { id },
        data: updateProjectOperationDto,
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to update project operation with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const projectOperation = await this.prisma.projectOperation.findUnique({
        where: { id },
      });

      if (!projectOperation) {
        throw new NotFoundException(
          `Project operation with id ${id} not found`,
        );
      }

      return await this.prisma.projectOperation.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete project operation with id ${id}: ${error.message}`,
      );
    }
  }
}
