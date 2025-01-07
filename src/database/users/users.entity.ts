import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'decimal', default: 0 })
  balance: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
