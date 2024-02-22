import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertEntity } from './entities/concert.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('concerts')
@ApiTags('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Post()
  @ApiCreatedResponse({ type: ConcertEntity })
  async create(@Body() createConcertDto: CreateConcertDto) {
    return new ConcertEntity(
      await this.concertsService.create(createConcertDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ConcertEntity, isArray: true })
  async findAll() {
    const concerts = await this.concertsService.findAll();
    return concerts.map((concert) => new ConcertEntity(concert));
  }

  @Get(':id')
  @ApiOkResponse({ type: ConcertEntity, isArray: true })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const concert = await this.concertsService.findOne(id);
    if (!concert) {
      throw new NotFoundException(`Concert with ${id} does not exist.`);
    }
    return new ConcertEntity(concert);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ConcertEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    return new ConcertEntity(
      await this.concertsService.update(id, updateConcertDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ConcertEntity })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.concertsService.remove(id);
  }
}
