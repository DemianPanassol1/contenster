import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { Role } from './role.entity';
import { Establishment } from './establishment.entity';

@Entity()
export class UserEstablishmentRole {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Establishment, (establishment) => establishment.userEstablishmentRole)
  establishment: Establishment;

  @ManyToOne(() => User, (user) => user.userEstablishmentRole)
  user: User;

  @ManyToOne(() => Role, (role) => role.userEstablishmentRole)
  role: Role;
}
