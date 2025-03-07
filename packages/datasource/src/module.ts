import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationAsync } from './types';

@Module({})
export class DatasourceModule {
  static forRootAsync(configuration: ConfigurationAsync): DynamicModule {
    console.log('configuration', configuration);

    return {
      module: DatasourceModule,
      imports: [],
      exports: [],
    };
  }
}
