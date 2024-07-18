import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = +request.params.id;

    if (user.userId !== userId || user.role !== 'admin')
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );

    return true;
  }
}
