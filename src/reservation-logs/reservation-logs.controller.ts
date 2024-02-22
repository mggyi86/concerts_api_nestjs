import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ReservationLogsService } from './reservation-logs.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationLogEntity } from './entities/reservation-log.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/admin-auth/admin-auth.guard';

@Controller('reservation-logs')
@ApiTags('reservation-logs')
export class ReservationLogsController {
  constructor(
    private readonly reservationLogsService: ReservationLogsService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async findByUser(@Request() req) {
    const logs = await this.reservationLogsService.findByUser(req?.user?.id);
    return logs.map((log) => new ReservationLogEntity(log));
  }

  @Get('all')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReservationLogEntity, isArray: true })
  async findAll() {
    const logs = await this.reservationLogsService.findAll();
    return logs.map((log) => new ReservationLogEntity(log));
  }
}
