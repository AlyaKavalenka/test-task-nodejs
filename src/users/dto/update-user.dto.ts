import { $Enums } from '@prisma/client';

export class UpdateUserDto {
  email: string;
  password: string;
  role: $Enums.Role;
}
