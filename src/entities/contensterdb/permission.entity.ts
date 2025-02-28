import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Role } from './role.entity';
import { Functionality } from './functionality.entity';
import { PermissionType } from 'src/shared/enums/common.enums';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: PermissionType })
  permissionType?: PermissionType;

  @Column({ type: 'boolean', default: true })
  canRead?: boolean;

  @Column({ type: 'boolean', default: false })
  canCreate?: boolean;

  @Column({ type: 'boolean', default: false })
  canUpdate?: boolean;

  @Column({ type: 'boolean', default: false })
  canDelete?: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Functionality, (functionality) => functionality.permission)
  functionality?: Functionality;

  @ManyToOne(() => Role, (role) => role.permission)
  role?: Role;
}
