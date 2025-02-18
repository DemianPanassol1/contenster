import { OmitType } from '@nestjs/swagger';

import { PermissionDto } from './permission.dto';

export class PostPermissionReqDto extends OmitType(PermissionDto, ['id'] as const) {}
