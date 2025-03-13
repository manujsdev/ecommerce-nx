import { Entity, Column } from 'typeorm';
import BaseEntity from '../base.entity.js';

@Entity()
export default class Tag extends BaseEntity {
  @Column()
  value!: string;
}
