import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { Language } from './language.entity';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', array: true })
  moduleOrder: number[];

  @Column({ type: 'int', array: true })
  functionalityOrder: number[];

  @Column({ type: 'jsonb' }) // isso provalvemente vai mudar
  preferences: object;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  deletedAt: Date | null;

  @OneToOne(() => User, (user) => user.preference)
  user: User;

  @ManyToOne(() => Language, (language) => language.preference)
  language: Language;
}
