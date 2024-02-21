import { ApiProperty } from '@nestjs/swagger';
import { Concert } from '@prisma/client';

export class ConcertEntity implements Concert {
  createdAt: Date;
  updatedAt: Date;
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  seat: number;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  reservedUsers: string[];

  @ApiProperty()
  reservedUsersCount: any;

  constructor({ ...data }: Partial<ConcertEntity>) {
    Object.assign(this, data);
    this.reservedUsersCount = this.reservedUsers.length;
  }
}
