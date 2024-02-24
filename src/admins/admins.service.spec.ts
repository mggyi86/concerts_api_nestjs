import { Test, TestingModule } from '@nestjs/testing';
import { AdminsService } from './admins.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

describe('AdminsService', () => {
  let adminService: AdminsService;

  const adminPrismaMock: MockProxy<
    Pick<
      PrismaClient['admin'],
      'findMany' | 'findUnique' | 'create' | 'update' | 'delete'
    >
  > = mock();
  const mockPrismaClient = {
    admin: adminPrismaMock,
  };

  const mockAdmin = {
    id: '7e6f4e15-a1ba-4ace-8246-7094e3945a1e',
    email: 'admin@admin.com',
    name: 'admin',
    password: '$2b$10$Jj.1YbJJUY97NaY8tVGDlu9Xwtp2VHUXtYOSfeUMdKRO8Elyd4hui',
    createdAt: new Date('2024-02-22T12:16:55.123Z'),
    updatedAt: new Date('2024-02-22T12:16:55.123Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsService],
      imports: [PrismaModule],
    }).compile();

    adminService = module.get<AdminsService>(AdminsService);
    mockReset(adminPrismaMock);
    adminService = new AdminsService(
      mockPrismaClient as unknown as PrismaService,
    );
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of admins', async () => {
      adminPrismaMock.findMany.mockResolvedValue([mockAdmin]);
      const result = await adminService.findAll();
      expect(result).toEqual([mockAdmin]);
    });
  });

  describe('create', () => {
    it('should create and return a admin', async () => {
      const newAdmin = {
        email: 'admin1@admin1.com',
        name: 'admin1',
        password: 'password',
      };

      adminPrismaMock.create.mockResolvedValue(mockAdmin);

      const result = await adminService.create(newAdmin as CreateAdminDto);

      expect(result).toEqual(mockAdmin);
    });
  });

  describe('findOne', () => {
    it('should find and return a admin by ID', async () => {
      adminPrismaMock.findUnique.mockResolvedValue(mockAdmin);

      const result = await adminService.findOne(mockAdmin.id);

      expect(result).toEqual(mockAdmin);
    });
  });

  describe('updateById', () => {
    it('should update and return a admin', async () => {
      const updatedAdmin = { ...mockAdmin, name: 'Updated name' };
      const admin = { name: 'Updated name' };

      adminPrismaMock.update.mockResolvedValue(updatedAdmin);

      const result = await adminService.update(
        mockAdmin.id,
        admin as UpdateAdminDto,
      );

      expect(result.name).toEqual(admin.name);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a book', async () => {
      adminPrismaMock.delete.mockResolvedValue(mockAdmin);

      const result = await adminService.remove(mockAdmin.id);

      expect(result).toEqual(mockAdmin);
    });
  });
});
