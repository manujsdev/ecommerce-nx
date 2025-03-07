import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  @IsDate()
  @IsOptional()
  updatedAt?: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  @IsOptional()
  @IsDate()
  readonly deletedAt?: Date | null;
}
