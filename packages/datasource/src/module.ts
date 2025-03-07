import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatasourceModule {
  static forRootAsync(configuration: any): DynamicModule {
    console.log('configuration', configuration);

    return {
      module: DatasourceModule,
      imports: [],
      exports: [],
    };
  }
}
