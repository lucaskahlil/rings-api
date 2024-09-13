import { Injectable } from '@nestjs/common';
import { CreateRingDto } from './models/dto/create-ring.dto';
import { UpdateRingDto } from './models/dto/update-ring.dto';

@Injectable()
export class RingService {
  create(createRingDto: CreateRingDto) {
    return 'This action adds a new ring';
  }

  findAll() {
    return `This action returns all ring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ring`;
  }

  update(id: number, updateRingDto: UpdateRingDto) {
    return `This action updates a #${id} ring`;
  }

  remove(id: number) {
    return `This action removes a #${id} ring`;
  }
}
