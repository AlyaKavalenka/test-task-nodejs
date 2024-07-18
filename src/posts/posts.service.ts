import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: { ...createPostDto, userId: +createPostDto.userId },
    });
  }

  async findAll(page: number) {
    const posts = await this.prisma.post.findMany({
      take: 4,
      skip: 4 * ((+page || 1) - 1),
    });

    return posts.length
      ? posts.map((post) => ({ id: post.id, title: post.title }))
      : [];
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post
      .update({
        where: {
          id: id,
        },
        data: { ...updatePostDto },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async remove(id: number) {
    await this.prisma.post.delete({ where: { id: id } }).catch(() => {
      throw new NotFoundException();
    });

    return;
  }
}
