import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // TODO: refactor when add auth
  // TODO: check if exist
  // TODO: hash password
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

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
