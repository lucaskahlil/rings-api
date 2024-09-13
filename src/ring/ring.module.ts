import { Module } from '@nestjs/common';
import { RingService } from './ring.service';
import { RingController } from './ring.controller';

@Module({
  controllers: [RingController],
  providers: [RingService],
})
export class RingModule {}
