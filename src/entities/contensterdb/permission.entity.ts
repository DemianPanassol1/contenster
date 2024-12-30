import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Role } from './role.entity';
import { Functionality } from './functionality.entity';

export enum PermissionType {
  general = 'general',
  establishment = 'establishment',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PermissionType })
  permissionType: PermissionType;

  @Column({ type: 'boolean', default: true })
  canRead: boolean;

  @Column({ type: 'boolean', default: false })
  canCreate: boolean;

  @Column({ type: 'boolean', default: false })
  canUpdate: boolean;

  @Column({ type: 'boolean', default: false })
  canDelete: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  deletedAt: Date | null;

  @ManyToOne(() => Functionality, (functionality) => functionality.permission)
  functionality: Functionality;

  @ManyToOne(() => Role, (role) => role.permission)
  role: Role;
}
