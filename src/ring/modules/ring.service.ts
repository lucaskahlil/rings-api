import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRingDto } from '../models/dto/create-ring.dto';
import { UpdateRingDto } from '../models/dto/update-ring.dto';
import { Ring } from '../models/entities/ring.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RingService {
  constructor(@InjectModel(Ring.name) private ringModel: Model<Ring>) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const existingRing = await this.ringModel
      .findOne({ name: createRingDto.name })
      .exec();
    if (existingRing) {
      throw new ConflictException(
        `Ring with name ${createRingDto.name} already exists`,
      );
    }

    const createdRing = new this.ringModel(createRingDto);
    return await createdRing.save();
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
