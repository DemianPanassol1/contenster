import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CronJobLog {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 70 })
  jobName?: string;

  @Column({ type: 'varchar', length: 25 })
  executionTime?: string;

  @Column({ type: 'jsonb', nullable: true, default: null })
  result?: object;

  @Column({ type: 'jsonb', nullable: true, default: null })
  error?: object;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;
}
