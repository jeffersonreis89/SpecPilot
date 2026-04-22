import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Collection } from '../../collections/entities/collection.entity';

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  requestName!: string;

  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  params?: string;

  @Column('int')
  statusCode!: number;

  @Column()
  status!: 'passed' | 'failed' | 'error'; // passed, failed, error

  @Column('json', { nullable: true })
  responseBody?: any;

  @Column('json', { nullable: true })
  expectedBody?: any;

  @Column({ nullable: true })
  errorMessage?: string;

  @Column('float', { nullable: true })
  duration?: number; // em ms

  @ManyToOne(() => Collection, { eager: false, onDelete: 'CASCADE' })
  collection!: Collection;

  @Column('uuid')
  collectionId!: string;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  user!: User;

  @Column('uuid')
  userId!: string;

  @CreateDateColumn()
  executedAt!: Date;
}
