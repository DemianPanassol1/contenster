import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: true, default: null })
  text?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Language, (language) => language.translations)
  language?: Language;
}
