import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { Language } from './language.entity';
import { Functionality } from './functionality.entity';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'int', array: true, default: [] })
  moduleOrder?: number[];

  @Column({ type: 'int', array: true, default: [] })
  functionalityOrder?: number[];

  @Column({ type: 'jsonb', default: {} })
  preferences?: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @OneToOne(() => User, (user) => user.preference)
  user?: User;

  @ManyToOne(() => Language, (language) => language.preference)
  language: Language;

  @ManyToOne(() => Functionality, (functionality) => functionality.preference, {
    nullable: true,
  })
  functionality?: Functionality;
}
