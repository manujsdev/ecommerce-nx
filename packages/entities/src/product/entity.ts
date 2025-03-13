import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import BaseEntity from '../base.entity.js';
import Tag from './tag.js';
import Category from './category.js';

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity()
export default class Product extends BaseEntity {
  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status!: ProductStatus;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags!: Tag[];

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories!: Category[];
}
