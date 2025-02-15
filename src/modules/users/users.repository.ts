import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { User } from 'src/entities/contensterdb/user.entity';
import { PermissionType } from 'src/shared/enums/common.enums';

import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

@Injectable()
export class UsersRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    super(i18n);
  }

  getUsersPaginated(query: GetUsersListReqDto): Promise<[User[], number]> {
    const { permissionType, establishmentId } = query;

    return this.userRepo.findAndCount({
      ...this.buildFilter(query, {
        userEstablishmentRole: {
          role: {
            establishment: {
              id: permissionType === PermissionType['establishment'] ? establishmentId : null,
            },
          },
        },
      }),
      relations: {
        image: true,
        userEstablishmentRole: {
          role: {
            titles: true,
            descriptions: true,
          },
          establishment: true,
        },
      },
    });
  }
}
