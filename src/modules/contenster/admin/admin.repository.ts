import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Role } from 'src/entities/contensterdb/role.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Preference } from 'src/entities/contensterdb/preference.entity';
import { Configuration } from 'src/entities/contensterdb/configuration.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class AdminRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(Preference) private preferenceRepo: Repository<Preference>,
    @InjectRepository(Configuration) private configRepo: Repository<Configuration>,
    @InjectRepository(Functionality) private functionalityRepo: Repository<Functionality>,
    @InjectRepository(Establishment) private establishmentRepo: Repository<Establishment>,
    @InjectRepository(UserEstablishmentRole)
    private userEstablishmentRepo: Repository<UserEstablishmentRole>,
  ) {
    super(i18n);
  }

  findByUserId(userId: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id: userId },
      relations: {
        userEstablishmentRole: {
          establishment: {
            image: true,
          },
          role: {
            titles: { language: true },
            descriptions: { language: true },
          },
        },
        preference: {
          functionality: true,
        },
        image: true,
      },
    });
  }

  findPermissions(roleId: number, establishmentId: number): Promise<UserEstablishmentRole> {
    return this.userEstablishmentRepo.findOne({
      where: { role: { id: roleId }, establishment: { id: establishmentId } },
      relations: {
        establishment: {
          image: true,
        },
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

  updateUserPassword(userId: number, password: string): Promise<UpdateResult> {
    return this.userRepo.update(userId, { password });
  }

  saveImage(image: Partial<Image>): Promise<Image> {
    return this.imageRepo.save(image);
  }

  async removeImage(imageId: number): Promise<Image> {
    const image = await this.imageRepo.findOneBy({ id: imageId });

    return this.imageRepo.remove(image);
  }

  findFunctionalitiesByRole(roleId: number) {
    return this.roleRepo.findOne({
      where: { id: roleId },
      relations: {
        // titles: { language: true },
        // descriptions: { language: true },
        permission: {
          functionality: {
            titles: { language: true },
            module: { titles: { language: true } /* , descriptions: { language: true } */ },
          },
        },
      },
    });
  }

  findConfiguration(): Promise<Configuration> {
    return this.configRepo.findOne({
      where: {},
      order: { id: 'ASC', languages: { id: 'ASC' } },
      relations: {
        languages: { icon: true },
        favicon: true,
        loginLogo: true,
        loginBanner: true,
      },
    });
  }

  findImageById(imageId: number): Promise<Image> {
    return this.imageRepo.findOne({
      where: { id: imageId },
    });
  }

  updateUser(userId: number, user: Partial<User>): Promise<UpdateResult> {
    return this.userRepo.update(userId, user);
  }

  updateUserPreference(
    preferenceId: number,
    preference: Partial<Preference>,
  ): Promise<UpdateResult> {
    return this.preferenceRepo.update(preferenceId, preference);
  }
}
