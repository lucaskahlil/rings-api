import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RingType } from 'src/ring/enum/ring.enum';

export class CreateRingDto {
  @ApiProperty({
    description: 'The name of the ring',
    example: 'The One Ring',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The power of the ring',
    example: 'Invisibility',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  power: string;

  @ApiProperty({
    description: 'The bearer of the ring',
    example: 'Frodo Baggins',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ringBearer: string;

  @ApiProperty({
    description: 'The forger of the ring',
    example: 'Sauron',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  forger: string;

  @ApiProperty({
    description: 'The type of the ring, must be HUMAN, ELF, SAURON, or DWARF',
    enum: RingType,
    example: RingType.SAURON,
    required: true,
  })
  @IsEnum(RingType)
  @IsNotEmpty()
  type: RingType;

  @ApiProperty({
    description: 'An image URL for the ring',
    example: 'https://example.com/ring.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
