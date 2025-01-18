import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  AfterRemove,
} from 'typeorm';
import { unlink } from 'fs';
import { join } from 'path';

import { User } from './user.entity';
import { Language } from './language.entity';
import { Establishment } from './establishment.entity';
import { Functionality } from './functionality.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  originalName: string;

  @Column({ type: 'varchar', length: 75 })
  newName: string;

  @Column({ type: 'varchar', length: 150 })
  filePath: string;

  @Column({ type: 'varchar', length: 25 })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int', nullable: true, default: null })
  width: number | null;

  @Column({ type: 'int', nullable: true, default: null })
  height: number | null;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  public updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  public deletedAt: Date | null;

  @OneToOne(() => Establishment, (establishment) => establishment.image)
  establishment: Establishment;

  @OneToOne(() => User, (user) => user.image)
  user: User;

  @OneToOne(() => Functionality, (functionality) => functionality.icon)
  functionality: Functionality;

  @OneToOne(() => Language, (language) => language.icon)
  language: Language;

  @AfterRemove()
  removeFile() {
    unlink(join(__dirname, '..', '..', '..', this.filePath), (err) => {
      throw new Error('Error on removing file: ' + err.message);
    });
  }
}
