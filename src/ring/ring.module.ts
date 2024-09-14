import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RingService } from './ring.service';

import { RingSchema } from './models/schema/ring.schema';
import { RingRepository } from './repository/ring.repository';
import { RingController } from './ring.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ring', schema: RingSchema }])],
  controllers: [RingController],
  providers: [RingService, RingRepository],
})
export class RingModule {
  static MongooseModule: any;
}
