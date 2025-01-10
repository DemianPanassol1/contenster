import { I18nContext, I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { Role } from 'src/entities/contensterdb/role.entity';
import { CoreRepository } from 'src/core/core.repository';

@Injectable()
export class AdminRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
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
      where: {
        id: roleId,
        titles: { language: { languageCode: I18nContext.current().lang } },
        descriptions: { language: { languageCode: I18nContext.current().lang } },
        permission: {
          functionality: {
            titles: {
              language: { languageCode: I18nContext.current().lang },
            },
            module: {
              titles: { language: { languageCode: I18nContext.current().lang } },
              descriptions: { language: { languageCode: I18nContext.current().lang } },
            },
          },
        },
      },
      relations: {
        titles: { language: true },
        descriptions: { language: true },
        permission: {
          functionality: {
            icon: true,
            titles: { language: true },
            module: { titles: { language: true }, descriptions: { language: true } },
          },
        },
      },
    });
  }
}
