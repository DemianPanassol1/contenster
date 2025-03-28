import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 75, type: 'varchar' })
  name?: string;

  @Column({ length: 150, type: 'varchar' })
  email?: string;

  @Column({ length: 75, type: 'varchar' })
  phone?: string;

  @Column({ length: 75, type: 'varchar' })
  subject?: string;

  @Column({ type: 'text' })
  content?: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt?: Date;
}
