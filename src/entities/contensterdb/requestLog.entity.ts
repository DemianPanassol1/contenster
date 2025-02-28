import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LoglevelType {
  info = 'info',
  warning = 'warning',
  error = 'error',
  fatal = 'fatal',
}

@Entity()
export class RequestLog {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: LoglevelType })
  logLevel?: LoglevelType;

  @Column({ type: 'char', length: 36 })
  requestId?: string;

  @Column({ type: 'varchar', length: 10 })
  httpMethod?: string;

  @Column({ type: 'float' })
  responseTime?: number;

  @Column({ type: 'text', nullable: true, default: null })
  requestHeader?: string;

  @Column({ type: 'text', nullable: true, default: null })
  requestBody?: string;

  @Column({ type: 'int' })
  responseStatusCode?: number;

  @Column({ type: 'text', nullable: true, default: null })
  responseBody?: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  ipAddress?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  userAgent?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;
}
