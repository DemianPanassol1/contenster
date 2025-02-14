import { Module } from '@nestjs/common';
import { EstablishmentUsersController } from './establishment-users.controller';
import { EstablishmentUsersService } from './establishment-users.service';

@Module({
  controllers: [EstablishmentUsersController],
  providers: [EstablishmentUsersService],
})
export class EstablishmentUsersModule {}
