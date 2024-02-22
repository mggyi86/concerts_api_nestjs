import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateConcertDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 5 })
  seat: number;

  // @ApiProperty({ required: false, nullable: true })
  // reservedUsers?: string[] = [];

  // @ApiProperty({
  //   required: false,
  //   default: 'f7195610-b75c-4177-969a-52ae50269dda',
  // })
  // authorId: string;
  // reservedUsersCount?: number | 0;
}
