import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max } from 'class-validator';

import { User } from '../users/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Min(5)
  @Max(50)
  title: string;

  @Column({ type: 'text' })
  @Min(5)
  @Max(50)
  description: string;

  @Column({ type: 'tinyint' })
  @Min(10)
  @Max(999)
  price: number;

  @Column({ type: 'boolean' })
  isAvailable: boolean;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
