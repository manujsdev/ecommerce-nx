import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import BaseEntity from '../base.entity.js';
import { IsOptional } from 'class-validator';

@Entity('Categories')
export default class CategoryEntity extends BaseEntity {
  @Column()
  name!: string;

  @ManyToOne((type) => CategoryEntity, (category) => category.children)
  @IsOptional()
  parent?: CategoryEntity;

  @OneToMany((type) => CategoryEntity, (category) => category.parent)
  @IsOptional()
  children?: CategoryEntity[];
}
