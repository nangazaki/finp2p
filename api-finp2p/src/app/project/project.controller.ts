import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
//import { Controller, Post, Body, UseInterceptors, UploadedFile, Delete, Get, Param, Put, Patch } from '@nestjs/common';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() req: any,
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createProjectDto.image = image;

    return this.projectService.create(req.user.id, createProjectDto);
  }

  @Get('data')
  getStats() {
    return this.projectService.stats();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mys')
  findMyProjects(@Req() req: any) {
    return this.projectService.findMyProjects(req.user.id);
  }

  @Get()
  findAllSite() {
    return this.projectService.findAll();
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('approveds')
  findAllApproved() {
    return this.projectService.findAllApproved();
  }

  @Get('rejecteds')
  findRejectedProjects() {
    return this.projectService.findRejectedProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Get('approved')
  async findApprovedProjects() {
    try {
      const approvedProjects = await this.projectService.findApprovedProjects();
      console.log('Nenhum projeto aprovado encontrado');
      if (approvedProjects.length === 0) {
      }
      return approvedProjects;
    } catch (error) {
      console.error(
        `Erro ao buscar projetos aprovados no controlador: ${error.message}`,
      );
      throw new Error('Falha ao buscar projetos aprovados');
    }
  }

  @Patch(':id/approve')
  async approveProject(@Param('id') id: string) {
    return this.projectService.approveProject(id);
  }

  @Patch(':id/reject')
  async rejectProject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.projectService.rejectProject(id, reason);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('payment')
  @UseInterceptors(FileInterceptor('comprovativo'))
  createPayment(
    @Req() req: any,
    @Body() createPayment: any,
    @UploadedFile() comprovativo: Express.Multer.File,
  ) {
    createPayment.comprovativo = comprovativo;

    return this.projectService.createPayment(req.user.id, createPayment);
  }
}
