import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ReservationLogs } from '@prisma/client';
import { ConcertEntity } from 'src/concerts/entities/concert.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ReservationLogEntity implements ReservationLogs {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  action: $Enums.Action;

  @ApiProperty({ required: false })
  reservedAt: Date;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @ApiProperty({ required: false, type: ConcertEntity })
  concert?: ConcertEntity;

  userId: string;
  concertId: string;

  userLog?: any;
  concertLog?: any;

  constructor({ userLog, concertLog, ...data }: Partial<ReservationLogEntity>) {
    Object.assign(this, data);

    if (userLog) {
      this.user = new UserEntity(userLog);
    }
    if (concertLog) {
      this.concert = new ConcertEntity(concertLog);
    }
  }
}
