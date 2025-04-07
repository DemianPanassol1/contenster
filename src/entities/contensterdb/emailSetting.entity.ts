import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { Translation } from './translation.entity';
import { Establishment } from './establishment.entity';

export enum EmailPurpose {
  RESET_PASSWORD = 'reset-password',
  VERIFY_EMAIL = 'verify-email',
  CONTACT = 'contact',
  WELCOME = 'welcome',
}

@Entity()
export class EmailSetting {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: EmailPurpose })
  purpose?: EmailPurpose;

  @Column({ type: 'varchar', length: 75 })
  server?: string;

  @Column({ type: 'varchar', length: 75 })
  username?: string;

  @Column({ type: 'varchar', length: 75 })
  password?: string;

  @Column({ type: 'int', default: 465 })
  port?: number;

  @Column({ type: 'bool', default: false })
  tls?: boolean;

  @Column({ type: 'bool', default: false })
  ssl?: boolean;

  @Column({ type: 'varchar', length: 75 })
  sender?: string;

  @Column({ type: 'varchar', length: 75 })
  recipient?: string;

  @Column({ type: 'varchar', length: 75, nullable: true, default: null })
  recipientCopy?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  subjects?: Translation[];

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  titles?: Translation[];

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  contents?: Translation[];

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  footers?: Translation[];

  @ManyToOne(() => Establishment, (establishment) => establishment.emailSetting)
  establishment?: Establishment;
}
