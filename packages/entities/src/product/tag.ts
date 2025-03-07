import { Entity, Column } from 'typeorm';
import BaseEntity from '../base.entity.js';

@Entity('Tags')
export default class Tag extends BaseEntity {
  @Column()
  value!: string;
}
