import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number) {
    return await this.prisma.user.findMany({
      take: 4,
      skip: 4 * ((+page || 1) - 1),
    });
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prisma.user
      .update({
        where: {
          id: id,
        },
        data: { ...updateUserDto, password: hashedPassword },
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
