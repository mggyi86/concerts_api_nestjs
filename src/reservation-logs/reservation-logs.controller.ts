import {
  Controller,
  Get,
  UseGuards,
  Request,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { ReservationLogsService } from './reservation-logs.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationLogEntity } from './entities/reservation-log.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/admin-auth/admin-auth.guard';
import { ConcertEntity } from 'src/concerts/entities/concert.entity';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationLogsController {
  constructor(
    private readonly reservationLogsService: ReservationLogsService,
  ) {}

  @Get('reserve/:concertId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async reserve(
    @Request() req,
    @Param('concertId', ParseUUIDPipe) concertId: string,
  ) {
    const concert = await this.reservationLogsService.reserve(
      req?.user?.id,
      concertId,
    );
    return new ConcertEntity(concert);
  }

  @Get('cancel/:concertId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async cancel(
    @Request() req,
    @Param('concertId', ParseUUIDPipe) concertId: string,
  ) {
    const concert = await this.reservationLogsService.cancel(
      req?.user?.id,
      concertId,
    );
    return new ConcertEntity(concert);
  }

  @Get('logs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async findByUser(@Request() req) {
    const logs = await this.reservationLogsService.findByUser(req?.user?.id);
    return logs.map((log) => new ReservationLogEntity(log));
  }

  @Get('all-logs')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async findAll() {
    const logs = await this.reservationLogsService.findAll();
    return logs.map((log) => new ReservationLogEntity(log));
  }
}
