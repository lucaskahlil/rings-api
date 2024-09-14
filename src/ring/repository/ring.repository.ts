import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateRingDto } from '../models/dto/create-ring.dto';
import { UpdateRingDto } from '../models/dto/update-ring.dto';
import { Ring } from '../models/interface/ring.interface';

@Injectable()
export class RingRepository {
  constructor(@InjectModel('Ring') private readonly ringModel: Model<Ring>) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const createdRing = new this.ringModel(createRingDto);
    return createdRing.save();
  }

  async findAll(): Promise<Ring[]> {
    return this.ringModel.find().exec();
  }

  async findById(id: string): Promise<Ring | null> {
    return this.ringModel.findById(id).exec();
  }

  async update(id: string, updateRingDto: UpdateRingDto): Promise<Ring | null> {
    return this.ringModel
      .findByIdAndUpdate(id, updateRingDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.ringModel.findByIdAndDelete(id).exec();
  }
}
