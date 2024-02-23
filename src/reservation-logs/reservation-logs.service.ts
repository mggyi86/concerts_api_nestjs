import { Injectable, NotAcceptableException } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationLogsService {
  constructor(private prisma: PrismaService) {}

  async reserve(userId: string, concertId: string) {
    const concert = await this.prisma.concert.findUnique({
      where: { id: concertId },
    });
    const reservedUsers = concert?.reservedUsers;
    if (reservedUsers.find((resId: string) => resId === userId)) {
      throw new NotAcceptableException('Already Reserve!');
    }
    const updatedConcert = await this.prisma.concert.update({
      where: {
        id: concertId,
      },
      data: {
        reservedUsers: [...reservedUsers, userId],
      },
    });
    await this.prisma.reservationLogs.create({
      data: {
        userId,
        concertId,
        action: $Enums.Action.Reserve,
      },
    });
    return updatedConcert;
  }

  async cancel(userId: string, concertId: string) {
    const concert = await this.prisma.concert.findUnique({
      where: { id: concertId },
    });
    const reservedUsers = concert?.reservedUsers;
    if (
      reservedUsers.length === 0 ||
      reservedUsers.every((resId: string) => resId !== userId)
    ) {
      throw new NotAcceptableException('Already Cancel!');
    }
    const updatedConcert = await this.prisma.concert.update({
      where: {
        id: concertId,
      },
      data: {
        reservedUsers: reservedUsers.filter(
          (resId: string) => resId !== userId,
        ),
      },
    });
    await this.prisma.reservationLogs.create({
      data: {
        userId,
        concertId,
        action: $Enums.Action.Cancel,
      },
    });
    return updatedConcert;
  }

  findAll() {
    return this.prisma.reservationLogs.findMany({
      include: {
        user: true,
        concert: true,
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.reservationLogs.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        concert: true,
      },
    });
  }
}
