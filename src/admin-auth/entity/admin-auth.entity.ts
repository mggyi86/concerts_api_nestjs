import { ApiProperty } from '@nestjs/swagger';

export class AdminAuthEntity {
  @ApiProperty()
  accessToken: string;
}
