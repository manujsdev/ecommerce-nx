import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import BaseEntity from '../base.entity.js';
import TagEntity from './tag.js';
import CategoryEntity from './category.js';
import Options from './options.js';
import Variant from './variant.js';

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity({ name: 'Product' })
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

  @ManyToMany(() => TagEntity, (tag) => tag, { cascade: true })
  @JoinTable({ name: 'TagProducts' })
  tags?: TagEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category, { cascade: true })
  @JoinTable({ name: 'ProductCategories' })
  category!: CategoryEntity;

  @OneToMany(() => Options, (option) => option.product, { cascade: true })
  options!: Options[];

  @OneToMany(() => Variant, (variant) => variant.product, { cascade: true })
  variants!: Variant[];
}
