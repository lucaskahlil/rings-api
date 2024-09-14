import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RingType } from 'src/ring/enum/ring.enum';

export class UpdateRingDto {
  @ApiProperty({
    description: 'The name of the ring',
    example: 'The One Ring',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The power of the ring',
    example: 'Invisibility',
    required: false,
  })
  @IsString()
  @IsOptional()
  power?: string;

  @ApiProperty({
    description: 'The bearer of the ring',
    example: 'Frodo Baggins',
    required: false,
  })
  @IsString()
  @IsOptional()
  ringBearer?: string;

  @ApiProperty({
    description: 'The forger of the ring',
    example: 'Sauron',
    required: false,
  })
  @IsString()
  @IsOptional()
  forger?: string;

  @ApiProperty({
    description: 'The type of the ring, can be HUMAN, ELF, SAURON, or DWARF',
    enum: RingType,
    example: RingType.SAURON,
  })
  @IsEnum(RingType)
  @IsOptional()
  type?: RingType;

  @ApiProperty({
    description: 'An image URL for the ring',
    example: 'https://example.com/ring.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
