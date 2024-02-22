/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConcertEntity } from './entities/concert.entity';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createConcertDto: CreateConcertDto) {
    const admin = await this.prisma.admin.findFirst();
    return this.prisma.concert.create({
      data: {
        ...createConcertDto,
        authorId,
        reservedUsers: [],
      },
    });
    // const concert = new ConcertEntity(createConcertDto);
    // return this.prisma.concert.create({ data: concert });
  }

  findAll() {
    return this.prisma.concert.findMany();
    // return this.prisma.user.findMany({
    //   include: {
    //     users: {
    //       include: {
    //         user: true,
    //       },
    //     },
    //   },
    // });
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
