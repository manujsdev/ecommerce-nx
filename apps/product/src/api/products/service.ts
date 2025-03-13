import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, TagEntity } from '@ecommerce-nx/entities';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async createTag(tag: Partial<TagEntity>): Promise<TagEntity> {
    return this.tagRepository.save(tag);
  }

  async createProduct(product: CreateProductDTO) {
    console.log(product.tags);
    // return this.productRepository.save(product);
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
