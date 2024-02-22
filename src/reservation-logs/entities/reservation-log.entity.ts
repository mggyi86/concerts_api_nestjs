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
  user?: any | UserEntity;

  @ApiProperty({ required: false, type: ConcertEntity })
  concert?: any | ConcertEntity;

  userId: string;
  concertId: string;

  constructor({ user, concert, ...data }: Partial<ReservationLogEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
    if (concert) {
      this.concert = new ConcertEntity(concert);
    }
  }
}
