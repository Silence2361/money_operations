import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'decimal', default: 0 })
  balance: string;
}
