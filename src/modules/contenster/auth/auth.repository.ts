import { I18nContext } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from 'src/entities/contensterdb/user.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User, 'contensterdb') private userRepo: Repository<User>,
    @InjectRepository(UserEstablishmentRole, 'contensterdb')
    private userEstablishmentRepo: Repository<UserEstablishmentRole>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({
      where: { username },
      relations: {
        userEstablishmentRole: {
          establishment: true,
          role: {
            titles: { language: true },
            descriptions: { language: true },
          },
        },
        preference: {
          functionality: true,
        },
      },
    });
  }

  findPermissions(roleId: number, establishmentId: number): Promise<UserEstablishmentRole> {
    return this.userEstablishmentRepo.findOne({
      where: { role: { id: roleId }, establishment: { id: establishmentId } },
      relations: {
        establishment: true,
        role: {
          permission: {
            functionality: {
              titles: { language: true },
            },
          },
          titles: { language: true },
          descriptions: { language: true },
        },
      },
    });
  }

  updateUserLastLoggedAt(userId: number): Promise<UpdateResult> {
    return this.userRepo.update(userId, { lastLoggedAt: new Date() });
  }

  updateUserPassword(userId: number, password: string): Promise<UpdateResult> {
    return this.userRepo.update(userId, { password });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        email,
        userEstablishmentRole: {
          establishment: {
            emailSetting: {
              titles: { language: { languageCode: I18nContext.current().lang } },
              footers: { language: { languageCode: I18nContext.current().lang } },
              subjects: { language: { languageCode: I18nContext.current().lang } },
              contents: { language: { languageCode: I18nContext.current().lang } },
            },
          },
        },
      },
      relations: {
        userEstablishmentRole: {
          establishment: {
            emailSetting: {
              titles: { language: true },
              footers: { language: true },
              subjects: { language: true },
              contents: { language: true },
            },
          },
        },
      },
    });
  }
}
