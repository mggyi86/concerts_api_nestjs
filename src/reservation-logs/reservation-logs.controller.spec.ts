import { Test, TestingModule } from '@nestjs/testing';
import { ReservationLogsController } from './reservation-logs.controller';
import { ReservationLogsService } from './reservation-logs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('ReservationLogsController', () => {
  let controller: ReservationLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationLogsController],
      providers: [ReservationLogsService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<ReservationLogsController>(
      ReservationLogsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
