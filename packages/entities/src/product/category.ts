import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import BaseEntity from '../base.entity.js';
import { IsOptional } from 'class-validator';

@Entity()
export default class Category extends BaseEntity {
  @Column()
  name!: string;

  @ManyToOne((type) => Category, (category) => category.children)
  @IsOptional()
  parent?: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  @IsOptional()
  children?: Category[];
}
