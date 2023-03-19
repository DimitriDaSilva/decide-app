import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  // @OneToMany(() => Table, table => table.user)
  // tables: Table[];
}
