import { Module } from '@nestjs/common';
import { EstablishmentRolesController } from './establishment-roles.controller';
import { EstablishmentRolesService } from './establishment-roles.service';

@Module({
  controllers: [EstablishmentRolesController],
  providers: [EstablishmentRolesService],
})
export class EstablishmentRolesModule {}
