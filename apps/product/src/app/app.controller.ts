import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger: Logger;
  constructor(private readonly appService: AppService) {
    this.logger = new Logger(AppController.name);
  }

  @Post('tag')
  createTag(@Body() dto: any) {
    this.logger.log(`[CreateTag]`, dto);

    return this.appService.createTag(dto);
  }

  @Post('product')
  createProduct(@Body() dto: any) {
    this.logger.log(`[CreateProduct]`, dto);

    return this.appService.createProduct(dto);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
