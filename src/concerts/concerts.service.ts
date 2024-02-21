/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  create(createConcertDto: CreateConcertDto) {
    return this.prisma.concert.create({ data: createConcertDto });
  }

  findAll() {
    return this.prisma.concert.findMany();
    // return this.prisma.user.findMany({
    //   include: {
    //     concertLogs: {
    //       include: {
    //         concertLog: true,
    //       },
    //     },
    //   },
    // });
  }

  findOne(id: string) {
    return this.prisma.concert.findUnique({ where: { id } });
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  remove(id: number) {
    return `This action removes a #${id} concert`;
  }
}
