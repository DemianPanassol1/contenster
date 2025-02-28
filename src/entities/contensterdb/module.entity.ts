import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';

import { Translation } from './translation.entity';
import { Functionality } from './functionality.entity';
import { Establishment } from './establishment.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'integer', default: 0 })
  position?: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;

  @ManyToOne(() => Establishment, (establishment) => establishment.module)
  establishment?: Establishment;

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  titles?: Translation[];

  @ManyToMany(() => Translation, { cascade: true })
  @JoinTable()
  descriptions?: Translation[];

  @OneToMany(() => Functionality, (functionality) => functionality.module)
  functionality?: Functionality[];
}
