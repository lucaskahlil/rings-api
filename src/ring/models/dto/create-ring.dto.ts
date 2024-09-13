import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of ring',
    example: 'Ring fire',
  })
  name: string;

  power: string;
  ringBearer: string;
  forger: string;
  type: string;
  image: string;
}
