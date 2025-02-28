import { OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class PostUserReqDto extends OmitType(UserDto, ['id', 'preferenceId'] as const) {}
