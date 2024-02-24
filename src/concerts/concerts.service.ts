/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createConcertDto: CreateConcertDto) {
    return this.prisma.concert.create({
      data: {
        ...createConcertDto,
        authorId,
        reservedUsers: [],
      },
    });
  }

  findAll() {
    return this.prisma.concert.findMany();
  }

  findOne(id: string) {
    return this.prisma.concert.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  update(id: string, updateConcertDto: UpdateConcertDto) {
    return this.prisma.concert.update({
      where: { id },
      data: updateConcertDto,
    });
  }

  remove(id: string) {
    return this.prisma.concert.delete({ where: { id } });
  }
}
