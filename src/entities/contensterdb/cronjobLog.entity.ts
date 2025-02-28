import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CronJobLog {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 70 })
  jobName?: string;

  @Column({ type: 'float' })
  executionTime?: number;

  @Column({ type: 'text', nullable: true, default: null })
  result?: string;

  @Column({ type: 'text', nullable: true, default: null })
  error?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;
}
