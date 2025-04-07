import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Language } from 'src/entities/contensterdb/language.entity';
import { Preference } from 'src/entities/contensterdb/preference.entity';
import { PermissionType } from 'src/entities/contensterdb/permission.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class UsersRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(User, 'contensterdb') private userRepo: Repository<User>,
    @InjectRepository(Image, 'contensterdb') private imageRepo: Repository<Image>,
    @InjectRepository(Language, 'contensterdb') private languageRepo: Repository<Language>,
    @InjectRepository(Preference, 'contensterdb') private preferenceRepo: Repository<Preference>,
    @InjectRepository(UserEstablishmentRole, 'contensterdb')
    private userEstablishmentRoleRepo: Repository<UserEstablishmentRole>,
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

  getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  getLanguageByCode(code: string): Promise<Language> {
    return this.languageRepo.findOne({
      where: { languageCode: code },
    });
  }

  async removeUser(user: User): Promise<User> {
    await this.userEstablishmentRoleRepo.remove(user.userEstablishmentRole);

    await this.userRepo.remove(user);

    if (user?.image) await this.imageRepo.remove(user.image);
    if (user?.preference) await this.preferenceRepo.remove(user.preference);

    return user;
  }
}
