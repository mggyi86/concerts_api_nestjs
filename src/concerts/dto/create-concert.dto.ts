import { ApiProperty } from '@nestjs/swagger';

export class CreateConcertDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  seat: number;

  @ApiProperty({ required: false, default: [] })
  reservedUsers: string[] = [];

  @ApiProperty({
    required: false,
    default: 'f7195610-b75c-4177-969a-52ae50269dda',
  })
  authorId: string;
}
