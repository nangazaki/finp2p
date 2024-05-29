import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectOperationService } from './project-operation.service';
import { CreateProjectOperationDto } from './dto/create-project-operation.dto';
import { UpdateProjectOperationDto } from './dto/update-project-operation.dto';

@Controller('project-operations')
export class ProjectOperationController {
  constructor(
    private readonly projectOperationService: ProjectOperationService,
  ) {}

  @Post()
  async create(@Body() createProjectOperationDto: CreateProjectOperationDto) {
    try {
      return await this.projectOperationService.create(
        createProjectOperationDto,
      );
    } catch (error) {
      throw new Error(`Error creating project operation: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.projectOperationService.findAll();
    } catch (error) {
      throw new Error(`Error finding project operations: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.projectOperationService.findOne(id);
    } catch (error) {
      throw new Error(
        `Error finding project operation with id ${id}: ${error.message}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectOperationDto: UpdateProjectOperationDto,
  ) {
    try {
      return await this.projectOperationService.update(
        id,
        updateProjectOperationDto,
      );
    } catch (error) {
      throw new Error(
        `Error updating project operation with id ${id}: ${error.message}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.projectOperationService.remove(id);
    } catch (error) {
      throw new Error(
        `Error removing project operation with id ${id}: ${error.message}`,
      );
    }
  }
}
