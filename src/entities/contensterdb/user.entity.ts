import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Image } from './image.entity';
import { Preference } from './preference.entity';
import { UserEstablishmentRole } from './userEstablishmentRole.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75, type: 'varchar' })
  name: string;

  @Column({ length: 75, type: 'varchar', unique: true })
  email: string;

  @Column({ length: 75, type: 'varchar', unique: true })
  username: string;

  @Column({ length: 25, type: 'varchar' })
  phone: string;

  @Column({ length: 300, type: 'varchar' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isBlocked: boolean;

  @Column({ type: 'timestamp without time zone', nullable: true, default: null })
  lastLoggedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  // @DeleteDateColumn({ type: 'timestamp without time zone' })
  // deletedAt: Date | null;

  @OneToOne(() => Image, (image) => image.user, { nullable: true, cascade: true })
  @JoinColumn()
  image: Image | null;

  @OneToOne(() => Preference, (preference) => preference.user, { cascade: true })
  @JoinColumn()
  preference: Preference;

  @OneToMany(() => UserEstablishmentRole, (userEstablishmentRole) => userEstablishmentRole.user)
  userEstablishmentRole: UserEstablishmentRole[];
}
