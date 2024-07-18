import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { OwnerGuard } from '../auth/owner.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { $Enums } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(OwnerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
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
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
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
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateUserDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = undefined;
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
