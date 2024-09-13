import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { RingService } from './ring.service';
import { Ring } from '../models/entities/ring.entity';
import { CreateRingDto } from '../models/dto/create-ring.dto';
import { UpdateRingDto } from '../models/dto/update-ring.dto';

@Controller('ring')
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Post()
  async create(@Body() createRingDto: CreateRingDto): Promise<Ring> {
    try {
      return await this.ringService.create(createRingDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `A ring with the name '${createRingDto.name}' already exists.`,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.ringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRingDto: UpdateRingDto) {
    return this.ringService.update(+id, updateRingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ringService.remove(+id);
  }
}
