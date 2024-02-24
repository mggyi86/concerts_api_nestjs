import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let userService: UsersService;

  const userPrismaMock: MockProxy<
    Pick<
      PrismaClient['user'],
      'findMany' | 'findUnique' | 'create' | 'update' | 'delete'
    >
  > = mock();
  const mockPrismaClient = {
    user: userPrismaMock,
  };

  const mockUser = {
    id: '7e6f4e15-a1ba-4ace-8246-7094e3945a1e',
    email: 'user1@user1.com',
    name: 'user1',
    password: '$2b$10$Jj.1YbJJUY97NaY8tVGDlu9Xwtp2VHUXtYOSfeUMdKRO8Elyd4hui',
    createdAt: new Date('2024-02-22T12:16:55.123Z'),
    updatedAt: new Date('2024-02-22T12:16:55.123Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [PrismaModule],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    mockReset(userPrismaMock);
    userService = new UsersService(
      mockPrismaClient as unknown as PrismaService,
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      userPrismaMock.findMany.mockResolvedValue([mockUser]);
      const result = await userService.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const newUser = {
        email: 'user1@user1.com',
        name: 'user1',
        password: 'password',
      };

      userPrismaMock.create.mockResolvedValue(mockUser);

      const result = await userService.create(newUser as CreateUserDto);

      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should find and return a user by ID', async () => {
      userPrismaMock.findUnique.mockResolvedValue(mockUser);

      const result = await userService.findOne(mockUser.id);

      expect(result).toEqual(mockUser);
    });
  });

  describe('updateById', () => {
    it('should update and return a user', async () => {
      const updatedUser = { ...mockUser, name: 'Updated name' };
      const user = { name: 'Updated name' };

      userPrismaMock.update.mockResolvedValue(updatedUser);

      const result = await userService.update(
        mockUser.id,
        user as UpdateUserDto,
      );

      expect(result.name).toEqual(user.name);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a book', async () => {
      userPrismaMock.delete.mockResolvedValue(mockUser);

      const result = await userService.remove(mockUser.id);

      expect(result).toEqual(mockUser);
    });
  });
});
