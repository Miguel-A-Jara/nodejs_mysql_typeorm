import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max } from 'class-validator';

import { Product } from '../products/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Min(5)
  @Max(50)
  name: string;

  @Column({ type: 'text' })
  @Min(5)
  @Max(50)
  lastname: string;

  @Column({ type: 'tinyint' })
  @Min(1)
  @Max(99)
  age: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => Product, product => product.user, { cascade: true })
  products: Product[];
}
