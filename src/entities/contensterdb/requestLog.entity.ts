import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

import { LoglevelType } from 'src/shared/enums/common.enums';

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

  @Column({ type: 'varchar', length: 25 })
  responseTime?: string;

  @Column({ type: 'jsonb', nullable: true, default: null })
  requestHeader?: object;

  @Column({ type: 'jsonb', nullable: true, default: null })
  requestBody?: object;

  @Column({ type: 'int' })
  responseStatusCode?: number;

  @Column({ type: 'jsonb', nullable: true, default: null })
  responseBody?: object;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null })
  ipAddress?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  userAgent?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;
}
