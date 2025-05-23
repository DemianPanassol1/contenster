import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Role } from 'src/entities/contensterdb/role.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class AdminRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role, 'contensterdb') private roleRepo: Repository<Role>,
    @InjectRepository(User, 'contensterdb') private userRepo: Repository<User>,
    @InjectRepository(Image, 'contensterdb') private imageRepo: Repository<Image>,
    @InjectRepository(UserEstablishmentRole, 'contensterdb')
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

  getImageById(imageId: number): Promise<Image> {
    return this.imageRepo.findOne({
      where: { id: imageId },
    });
  }

  removeImage(image: Image): Promise<Image> {
    return this.imageRepo.remove(image);
  }

  findFunctionalitiesByRole(roleId: number) {
    return this.roleRepo.findOne({
      where: { id: roleId },
      relations: {
        permission: {
          functionality: {
            titles: { language: true },
            module: { titles: { language: true } },
          },
        },
      },
    });
  }

  saveUser(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }
}
