import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AdminEntity implements Admin {
  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;
}
