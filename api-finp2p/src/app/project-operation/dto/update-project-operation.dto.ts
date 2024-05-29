import { PartialType } from '@nestjs/swagger';
import { CreateProjectOperationDto } from './create-project-operation.dto';

export class UpdateProjectOperationDto extends PartialType(CreateProjectOperationDto) {}
