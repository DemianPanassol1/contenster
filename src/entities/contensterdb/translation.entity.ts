import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { Language } from './language.entity';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  text: string | null;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  deletedAt: Date | null;

  @ManyToOne(() => Language, (language) => language.translations)
  language: Language;
}
