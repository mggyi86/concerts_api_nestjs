import { Test, TestingModule } from '@nestjs/testing';
import { ReservationLogsService } from './reservation-logs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('ReservationLogsService', () => {
  let service: ReservationLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationLogsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<ReservationLogsService>(ReservationLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
