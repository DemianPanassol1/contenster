import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';

import { Module } from './module.entity';
import { Preference } from './preference.entity';
import { Permission } from './permission.entity';
import { Translation } from './translation.entity';

@Entity()
export class Functionality {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 25, type: 'varchar' })
  slug?: string;

  @Column({ type: 'integer', default: 0 })
  position?: number;

  @Column({ length: 75, type: 'varchar', nullable: true })
  icon?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Module, (module) => module.functionality)
  module?: Module;

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  titles?: Translation[];

  @OneToMany(() => Permission, (permission) => permission.functionality)
  permission?: Permission[];

  @OneToMany(() => Preference, (preference) => preference.functionality)
  preference?: Preference[];
}
