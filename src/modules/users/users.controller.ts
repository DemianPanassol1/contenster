import { Controller } from '@nestjs/common';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

@Authorize()
@Controller({ version: '1' })
export class UsersController {}
