import { Module } from '@nestjs/common';
import { ReservationLogsService } from './reservation-logs.service';
import { ReservationLogsController } from './reservation-logs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ReservationLogsController],
  imports: [PrismaModule],
  providers: [ReservationLogsService],
})
export class ReservationLogsModule {}
