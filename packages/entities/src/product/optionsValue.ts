import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '../base.entity.js';
import Product from './entity.js';
import Options from './options.js';

@Entity({ name: 'OptionsValue' })
export default class OptionsValue extends BaseEntity {
  @Column()
  value!: string;

  @ManyToOne(() => Product, (product) => product.options)
  product!: Product;

  @ManyToOne(() => Options, (option) => option.values)
  option!: Options;
}
