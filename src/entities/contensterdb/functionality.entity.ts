import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';

import { Image } from './image.entity';
import { Module } from './module.entity';
import { Preference } from './preference.entity';
import { Permission } from './permission.entity';
import { Translation } from './translation.entity';
import { Establishment } from './establishment.entity';

@Entity()
export class Functionality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, type: 'varchar' })
  slug: string;

  @Column({ type: 'integer', default: 0 })
  position: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  // @DeleteDateColumn({ type: 'timestamp without time zone' })
  // deletedAt: Date | null;

  @ManyToOne(() => Establishment, (establishment) => establishment.functionality)
  establishment: Establishment;

  @ManyToOne(() => Module, (module) => module.functionality)
  module: Module;

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  titles: Translation[];

  @OneToOne(() => Image, (icon) => icon.functionality, { cascade: true })
  @JoinColumn()
  icon: Image;

  @OneToMany(() => Permission, (permission) => permission.functionality)
  permission: Permission[];

  @OneToMany(() => Preference, (preference) => preference.functionality)
  preference: Preference[];
}
