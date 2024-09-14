import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateRingDto } from './models/dto/create-ring.dto';
import { UpdateRingDto } from './models/dto/update-ring.dto';
import { RingRepository } from './repository/ring.repository';
import { Ring } from './models/interface/ring.interface';

@Injectable()
export class RingService {
  constructor(private readonly ringRepository: RingRepository) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const existingRing = await this.ringRepository.findAll();
    if (existingRing.some((ring) => ring.name === createRingDto.name)) {
      throw new ConflictException(
        `Ring with this ${createRingDto.name} already exists`,
      );
    }
    return this.ringRepository.create(createRingDto);
  }

  async findAll(): Promise<Ring[]> {
    return this.ringRepository.findAll();
  }

  async findOne(id: string): Promise<Ring> {
    const ring = await this.ringRepository.findById(id);
    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }
    return ring;
  }

  async update(id: string, updateRingDto: UpdateRingDto): Promise<Ring> {
    await this.findOne(id);
    return this.ringRepository.update(id, updateRingDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.ringRepository.delete(id);
  }
}
