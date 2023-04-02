import { Table } from '@/table/table.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @OneToMany(() => Table, (table) => table.user)
  tables: Table[];
}
