import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '../base.entity.js';
import Product from './entity.js';

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity({ name: 'Options' })
export default class Options extends BaseEntity {
  @Column()
  title!: string;

  @ManyToOne(() => Product, (product) => product.options)
  product!: Product;
}
