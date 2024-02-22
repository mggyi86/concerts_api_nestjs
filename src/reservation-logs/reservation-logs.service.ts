import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationLogsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.reservationLogs.findMany({
      include: {
        userLog: true,
        concertLog: true,
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.reservationLogs.findMany({
      where: {
        userId,
      },
      include: {
        userLog: true,
        concertLog: true,
      },
    });
  }
}
