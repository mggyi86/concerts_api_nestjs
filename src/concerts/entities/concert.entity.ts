import { ApiProperty } from '@nestjs/swagger';
import { Concert } from '@prisma/client';
import { AdminEntity } from 'src/admins/entities/admin.entity';

export class ConcertEntity implements Concert {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  seat: number;

  authorId: string;
  reservedUsers: string[];
  reservedUsersCount: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty({ required: false, type: AdminEntity })
  author: AdminEntity;

  constructor({ author, ...data }: Partial<ConcertEntity>) {
    Object.assign(this, data);
    this.reservedUsersCount = this.reservedUsers?.length;

    if (author) {
      this.author = new AdminEntity(author);
    }
  }
}
