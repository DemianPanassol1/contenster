import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Role } from './role.entity';
import { Image } from './image.entity';
import { Module } from './module.entity';
import { EmailSetting } from './emailSetting.entity';
import { UserEstablishmentRole } from './userEstablishmentRole.entity';

import { DocumentType } from 'src/shared/enums/common.enums';
@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 75, type: 'varchar', unique: true })
  slug?: string;

  @Column({ length: 75, type: 'varchar' })
  corporateName?: string;

  @Column({ length: 75, type: 'varchar' })
  fantasyName?: string;

  @Column({ length: 75, type: 'varchar' })
  address?: string;

  @Column({ length: 25, type: 'varchar' })
  addressNumber?: string;

  @Column({ length: 25, type: 'varchar' })
  zipCode?: string;

  @Column({ length: 75, type: 'varchar' })
  district?: string;

  @Column({ length: 25, type: 'varchar' })
  document?: string;

  @Column({ type: 'enum', enum: DocumentType })
  documentType?: DocumentType;

  @Column({ length: 150, type: 'varchar' })
  email?: string;

  @Column({ length: 75, type: 'varchar' })
  phone1?: string;

  @Column({ length: 75, type: 'varchar', nullable: true })
  phone2?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  public updatedAt?: Date | null;

  @OneToOne(() => Image, (image) => image.establishment, { nullable: true, cascade: true })
  @JoinColumn()
  image?: Image | null;

  @OneToMany(() => Module, (module) => module.establishment)
  module?: Module[];

  @OneToMany(() => EmailSetting, (emailSetting) => emailSetting.establishment)
  emailSetting?: EmailSetting[];

  @OneToMany(() => Role, (role) => role.establishment)
  role?: Role[];

  @OneToMany(
    () => UserEstablishmentRole,
    (userEstablishmentRole) => userEstablishmentRole.establishment,
  )
  userEstablishmentRole?: UserEstablishmentRole[];
}
