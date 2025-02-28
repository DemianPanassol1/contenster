import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';

import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

import { User } from 'src/entities/contensterdb/user.entity';
import { Language } from 'src/entities/contensterdb/language.entity';

@Injectable()
export class UsersRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Language) private languageRepo: Repository<Language>,
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
        // userEstablishmentRole: {
        //   role: {
        //     titles: { language: true },
        //     descriptions: { language: true },
        //   },
        //   establishment: true,
        // },
      },
    });
  }

  getUserById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
      relations: {
        image: true,
        preference: true,
        userEstablishmentRole: {
          role: {
            titles: { language: true },
            descriptions: { language: true },
          },
          establishment: true,
        },
      },
    });
  }

  saveUser(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }

  getUserByUserName(userName: string): Promise<User> {
    return this.userRepo.findOne({
      where: { username: userName },
    });
  }

  getLanguageByCode(code: string): Promise<Language> {
    return this.languageRepo.findOne({
      where: { languageCode: code },
    });
  }
}
