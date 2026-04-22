import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('json')
  postmanData!: any; // Store entire Postman collection

  @Column({ nullable: true })
  baseUrl?: string;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  user!: User;

  @Column('uuid')
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
