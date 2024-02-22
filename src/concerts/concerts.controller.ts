import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertEntity } from './entities/concert.entity';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ConcertEntity(await this.concertsService.remove(id));
  }
}
