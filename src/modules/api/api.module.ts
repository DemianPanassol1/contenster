import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
