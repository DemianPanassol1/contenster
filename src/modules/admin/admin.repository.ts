import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(Establishment) private establishmentRepo: Repository<Establishment>,
    @InjectRepository(UserEstablishmentRole)
    private userEstablishmentRepo: Repository<UserEstablishmentRole>,
  ) {}

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
}
