import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // TODO: check auth
  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: { ...createPostDto, userId: +createPostDto.userId },
    });
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();

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
        data: { ...updatePostDto, userId: +updatePostDto.userId },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
