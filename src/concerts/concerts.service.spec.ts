import { PrismaClient } from '@prisma/client';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

describe('ConcertsService', () => {
  let concertService: ConcertsService;

  const concertPrismaMock: MockProxy<
    Pick<
      PrismaClient['concert'],
      'findMany' | 'findUnique' | 'create' | 'update' | 'delete'
    >
  > = mock();
  const mockPrismaClient = {
    concert: concertPrismaMock,
  };

  const mockConcert = {
    id: '85391440-5b3c-49fe-9adc-1ddd973841b5',
    name: 'Concert Name 5',
    description:
      'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
    seat: 500,
    authorId: 'fb37d2ba-1fc2-425c-ad74-c916b66599cd',
    reservedUsers: ['7e6f4e15-a1ba-4ace-8246-7094e3945a1e'],
    createdAt: new Date('2024-02-22T12:16:55.106Z'),
    updatedAt: new Date('2024-02-23T22:45:51.968Z'),
  };

  beforeEach(async () => {
    mockReset(concertPrismaMock);
    concertService = new ConcertsService(
      mockPrismaClient as unknown as PrismaService,
    );
  });

  it('should be defined', () => {
    expect(concertService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of concerts', async () => {
      concertPrismaMock.findMany.mockResolvedValue([mockConcert]);
      const result = await concertService.findAll();
      expect(result).toEqual([mockConcert]);
    });
  });

  describe('create', () => {
    it('should create and return a concert', async () => {
      const newConcert = {
        name: 'Concert Name 5',
        description:
          'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
        seat: 500,
        authorId: 'fb37d2ba-1fc2-425c-ad74-c916b66599cd',
        reservedUsers: ['7e6f4e15-a1ba-4ace-8246-7094e3945a1e'],
      };

      concertPrismaMock.create.mockResolvedValue(mockConcert);

      const result = await concertService.create(
        newConcert.authorId as string,
        newConcert as CreateConcertDto,
      );

      expect(result).toEqual(mockConcert);
    });
  });

  describe('findOne', () => {
    it('should find and return a concert by ID', async () => {
      concertPrismaMock.findUnique.mockResolvedValue(mockConcert);

      const result = await concertService.findOne(mockConcert.id);

      expect(result).toEqual(mockConcert);
    });
  });

  describe('updateById', () => {
    it('should update and return a concert', async () => {
      const updatedConcert = { ...mockConcert, name: 'Updated name' };
      const concert = { name: 'Updated name' };

      concertPrismaMock.update.mockResolvedValue(updatedConcert);

      const result = await concertService.update(
        mockConcert.id,
        concert as UpdateConcertDto,
      );

      expect(result.name).toEqual(concert.name);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a book', async () => {
      concertPrismaMock.delete.mockResolvedValue(mockConcert);

      const result = await concertService.remove(mockConcert.id);

      expect(result).toEqual(mockConcert);
    });
  });
});
