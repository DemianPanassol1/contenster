import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  Column,
} from 'typeorm';

import { Image } from './image.entity';
import { Language } from './language.entity';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 75, type: 'varchar' })
  projectName?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @OneToOne(() => Image, (image) => image.loginBanner, { cascade: true })
  @JoinColumn()
  loginBanner?: Image;

  @OneToOne(() => Image, (image) => image.loginLogo, { cascade: true })
  @JoinColumn()
  loginLogo?: Image;

  @OneToOne(() => Image, (image) => image.favicon, { cascade: true })
  @JoinColumn()
  favicon?: Image;

  @ManyToMany(() => Language)
  @JoinTable()
  languages?: Language[];
}
