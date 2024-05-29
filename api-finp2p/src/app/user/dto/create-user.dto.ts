import { AccountType } from '@prisma/client';

export class CreateUserDto {
  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;

  accountType?: AccountType;

  entity_nif?: string;

  entity_name?: string;

  entity_email?: string;

  entity_ministry?: string;
}
