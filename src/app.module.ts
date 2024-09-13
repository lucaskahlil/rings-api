import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RingModule } from './ring/ring.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Rings'),
    RingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
