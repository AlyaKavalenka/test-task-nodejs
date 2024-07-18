import { $Enums } from '@prisma/client';

export class RegisterDto {
  email: string;
  password: string;
  role?: $Enums.Role;
}
