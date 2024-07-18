import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { $Enums } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: {
        id: number;
        email: string;
        password: string;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
      }[] = [
        {
          id: 1,
          email: 'test@test.com',
          password: 'password',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result: {
        id: number;
        email: string;
        password: string;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
      } = {
        id: 1,
        email: 'test@test.com',
        password: 'password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw a NotFoundException', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        password: 'newpassword',
        email: 'test@test.com',
        role: 'admin',
      };
      const result = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updateUserDto,
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      expect(await service.update(1, updateUserDto)).toBe(result);
    });

    it('should throw a NotFoundException', async () => {
      const updateUserDto: UpdateUserDto = {
        password: 'newPassword',
        email: 'test@test.com',
        role: 'admin',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
      jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error());

      await expect(service.update(1, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBe(undefined);
    });

    it('should throw a NotFoundException', async () => {
      jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
