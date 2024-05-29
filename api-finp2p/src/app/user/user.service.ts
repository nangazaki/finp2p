import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Entity } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExists = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (userAlreadyExists) {
        throw new ConflictException('E-mail já está em uso.');
      }

      const user = await this.prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: bcrypt.hashSync(createUserDto.password, 10),
          accountType: createUserDto.accountType,
        },
      });

      const entityData: Partial<Entity> = {
        email: '',
        ministry: '',
        name: '',
        nif: '',
        userId: user.id,
      };

      if (createUserDto.accountType === 'particular') {
        entityData.nif = createUserDto.firstName;
        entityData.name =
          createUserDto.firstName + ' ' + createUserDto.lastName;
        entityData.email = createUserDto.email;
      }

      if (
        createUserDto.accountType === 'financial' ||
        createUserDto.accountType === 'state_owned'
      ) {
        entityData.name = createUserDto.entity_name;
        entityData.nif = createUserDto.entity_nif;
        entityData.email = createUserDto.entity_email;

        if (createUserDto.accountType === 'state_owned') {
          entityData.ministry = createUserDto.entity_ministry;
        }
      }

      await this.prisma.entity.create({
        data: {
          name: entityData.name,
          email: entityData.email,
          nif: entityData.nif,
          ministry: entityData.ministry,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, peerPage: number) {
    try {
      const skip = page > 0 ? peerPage * (page - 1) : 0;

      const [total, data] = await Promise.all([
        this.prisma.user.count({
          where: { isAdmin: false, accountVerify: true },
        }),
        this.prisma.user.findMany({
          where: { isAdmin: false, accountVerify: true },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            accountType: true,
          },
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
      throw new Error('Erro ao buscar usuários');
    }
  }

  async findAllDisables(page: number, peerPage: number) {
    try {
      const skip = page > 0 ? peerPage * (page - 1) : 0;

      const [total, data] = await Promise.all([
        this.prisma.user.count({
          where: { isAdmin: false, accountVerify: false },
        }),
        this.prisma.user.findMany({
          where: { isAdmin: false, accountVerify: false },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            accountType: true,
            accountVerify: true,
          },
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
      throw new Error('Erro ao buscar usuários');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: {
          entity: true,
        },
      });

      const projects = await this.prisma.project.findMany({
        where: {
          entityId: user.entity.id,
        },
      });

      const { password, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        projects,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      console.error(`Erro ao atualizar usuário: ${error.message}`);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async remove(id: string) {
    try {
      // Remove a entidade associada e os projetos antes de remover o usuário
      const entity = await this.prisma.entity.delete({
        where: { userId: id },
      });

      await this.prisma.project.deleteMany({
        where: { entityId: entity.id },
      });

      await this.prisma.user.delete({
        where: { id },
      });

      return;
    } catch (error) {
      console.error(`Erro ao remover usuário e entidade: ${error.message}`);
      throw new Error('Erro ao remover usuário e entidade');
    }
  }

  async activeAccount(id: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { accountVerify: true },
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async disableAccount(id: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { accountVerify: false },
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}
