import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  AfterRemove,
} from 'typeorm';
import { unlink } from 'fs';
import { join } from 'path';

import { User } from './user.entity';
import { Language } from './language.entity';
import { Establishment } from './establishment.entity';
import { Configuration } from './configuration.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  originalName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  newName?: string;

  @Column({ type: 'text', nullable: true, default: null })
  filePath?: string;

  @Column({ type: 'varchar', length: 25 })
  mimeType?: string;

  @Column({ type: 'int' })
  size?: number;

  @Column({ type: 'int', nullable: true, default: null })
  width?: number;

  @Column({ type: 'int', nullable: true, default: null })
  height?: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  public updatedAt?: Date;

  @OneToOne(() => Establishment, (establishment) => establishment.image)
  establishment?: Establishment;

  @OneToOne(() => User, (user) => user.image)
  user?: User;

  @OneToOne(() => Language, (language) => language.icon)
  language?: Language;

  @OneToOne(() => Configuration, (configuration) => configuration.loginBanner)
  loginBanner?: Configuration;

  @OneToOne(() => Configuration, (configuration) => configuration.loginLogo)
  loginLogo?: Configuration;

  @OneToOne(() => Configuration, (configuration) => configuration.favicon)
  favicon?: Configuration;

  @AfterRemove()
  removeFile?() {
    unlink(join(__dirname, '..', '..', '..', 'public', this.filePath), (err) => {
      if (err) throw new Error('Error on removing file: ' + err.message);
    });
  }
}
