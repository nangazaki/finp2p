import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateInvestmentDto } from './dto/update-investiment.dto';
import { InvestmentService } from './investiment.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('comprovante'))
  async create(
    @Req() req: any,
    @Body() createInvestmentDto: any,
    @UploadedFile() comprovante: Express.Multer.File,
  ) {
    createInvestmentDto.comprovante = comprovante;

    return await this.investmentService.create(
      req.user.id,
      createInvestmentDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('generate-reference')
  async generateReference(@Req() req: any, @Body() createReference: any) {
    return await this.investmentService.generateReference(
      req.user.id,
      createReference,
    );
  }

  @Get()
  async findAll() {
    try {
      return await this.investmentService.findAll();
    } catch (error) {
      throw new Error(`Error finding investments: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.investmentService.findOne(id);
    } catch (error) {
      throw new Error(
        `Error finding investment with id ${id}: ${error.message}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.investmentService.remove(id);
    } catch (error) {
      throw new Error(
        `Error removing investment with id ${id}: ${error.message}`,
      );
    }
  }
}
