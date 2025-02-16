import { OmitType } from '@nestjs/swagger';

import { RoleDto } from './role.dto';

export class PostRoleReqDto extends OmitType(RoleDto, ['id'] as const) {}
