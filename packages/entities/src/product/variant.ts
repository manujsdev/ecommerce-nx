import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '../base.entity.js';
import Product from './entity.js';

@Entity({ name: 'Variant' })
export default class Variant extends BaseEntity {
  @Column()
  title!: string;

  @ManyToOne(() => Product, (product) => product.variants)
  product!: Product;

  @Column()
  sku!: string;

  @Column()
  ean!: string;

  @Column()
  barcode!: string;

  @Column()
  quantity!: number;

  @Column()
  weight!: number;

  @Column()
  length!: number;

  @Column()
  height!: number;

  @Column()
  width!: number;
}
