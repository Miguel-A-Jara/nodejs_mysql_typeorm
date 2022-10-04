import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max } from 'class-validator';

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
  @Min(1)
  @Max(99)
  price: number;

  @Column({ type: 'boolean' })
  isAvailable: boolean;
}
