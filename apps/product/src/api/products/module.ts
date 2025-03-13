import { Module } from '@nestjs/common';
import { ProductsController } from './controller';
import { ProductsService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductEntity,
  CategoryEntity,
  OptionsEntity,
  TagEntity,
  VariantEntity,
  OptionsValueEntity,
} from '@ecommerce-nx/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      OptionsEntity,
      TagEntity,
      VariantEntity,
      OptionsValueEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
