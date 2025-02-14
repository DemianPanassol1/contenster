import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreRepository } from 'src/core/core.repository';

@Injectable()
export class RolesRepository extends CoreRepository {
  constructor(public readonly i18n: I18nService) {
    super(i18n);
  }
}
