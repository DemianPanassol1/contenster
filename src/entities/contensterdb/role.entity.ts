import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Permission } from './permission.entity';
import { Translation } from './translation.entity';
import { Establishment } from './establishment.entity';
import { UserEstablishmentRole } from './userEstablishmentRole.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Establishment, (establishment) => establishment.role)
  establishment?: Establishment;

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  titles?: Translation[];

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  descriptions?: Translation[];

  @OneToMany(() => UserEstablishmentRole, (userEstablishmentRole) => userEstablishmentRole.role)
  userEstablishmentRole?: UserEstablishmentRole[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permission?: Permission[];
}
