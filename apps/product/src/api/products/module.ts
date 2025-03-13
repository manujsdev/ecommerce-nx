import { Module } from '@nestjs/common';
import { ProductsController } from './controller';
import { ProductsService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductEntity,
  CategoryEntity,
  TagEntity,
} from '@ecommerce-nx/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, TagEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
