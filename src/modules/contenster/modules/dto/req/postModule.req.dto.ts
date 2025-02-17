import { OmitType } from '@nestjs/swagger';

import { ModuleDto } from './module.dto';

export class PostModuleReqDto extends OmitType(ModuleDto, ['id'] as const) {}
