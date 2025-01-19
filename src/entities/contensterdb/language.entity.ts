import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Image } from './image.entity';
import { Preference } from './preference.entity';
import { Translation } from './translation.entity';

export enum LanguageType {
  console = 'console',
  site = 'site',
  both = 'both',
  none = 'none',
}

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 75 })
  name: string;

  @Column({ type: 'char', length: 2 })
  languageCode: string;

  @Column({ type: 'char', length: 2, nullable: true, default: null })
  regionCode: string | null;

  @Column({ type: 'enum', enum: LanguageType })
  purpose: LanguageType;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  // @DeleteDateColumn({ type: 'timestamp without time zone' })
  // deletedAt: Date | null;

  @OneToMany(() => Translation, (translation) => translation.language)
  translations: Translation[];

  @OneToMany(() => Preference, (user) => user.language)
  preference: Preference[];

  @OneToOne(() => Image, (icon) => icon.language, { cascade: true })
  @JoinColumn()
  icon: Image | null;
}
