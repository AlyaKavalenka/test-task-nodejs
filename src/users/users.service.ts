import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // TODO: check role
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  // TODO: hash password
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user
      .update({
        where: {
          id: id,
        },
        data: updateUserDto,
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async remove(id: number) {
    await this.prisma.user
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return;
  }
}
