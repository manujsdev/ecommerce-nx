import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ProductsService } from './service';
import { type CreateProductDTO } from './dto/create.dto';

@Controller('products')
export class ProductsController {
  private readonly logger: Logger;
  constructor(private readonly service: ProductsService) {
    this.logger = new Logger(ProductsController.name);
  }

  @Post('')
  createProduct(@Body() dto: CreateProductDTO) {
    this.logger.log(`[CreateProduct]`, dto);

    return this.service.createProduct(dto);
  }

  @Get()
  getData() {
    return this.service.getData();
  }
}
