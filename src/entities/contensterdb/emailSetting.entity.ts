import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { Translation } from './translation.entity';
import { Establishment } from './establishment.entity';

@Entity()
export class EmailSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 75 })
  server: string;

  @Column({ type: 'varchar', length: 75 })
  username: string;

  @Column({ type: 'varchar', length: 75 })
  password: string;

  @Column({ type: 'int', default: 465 })
  port: number;

  @Column({ type: 'bool', default: false })
  tls: boolean;

  @Column({ type: 'bool', default: false })
  ssl: boolean;

  @Column({ type: 'varchar', length: 75 })
  sender: string;

  @Column({ type: 'varchar', length: 75 })
  recipient: string;

  @Column({ type: 'varchar', length: 75, nullable: true, default: null })
  recipientCopy: string | null;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  deletedAt: Date | null;

  @ManyToMany(() => Translation, { cascade: true, eager: true })
  @JoinTable()
  subjects: Translation[];

  @ManyToMany(() => Translation, { cascade: true, eager: true })
  @JoinTable()
  titles: Translation[];

  @ManyToMany(() => Translation, { cascade: true, eager: true })
  @JoinTable()
  contents: Translation[];

  @ManyToMany(() => Translation, { cascade: true, eager: true })
  @JoinTable()
  footers: Translation[];

  @ManyToOne(() => Establishment, (establishment) => establishment.emailSetting)
  establishment: Establishment;
}
