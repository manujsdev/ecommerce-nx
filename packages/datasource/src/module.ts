import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, ConfigurationAsync } from './types';
import CoreEntityCollection from './entities';
import _ from 'lodash';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatasourceModule {
  static forRootAsync(configuration: ConfigurationAsync): DynamicModule {
    console.log('configuration', configuration);

    const useFactoryWrapper = async (...parameters: any) => {
      const factory =
        configuration.useFactory || (_.noop as () => Configuration);

      const settings = (await factory(...parameters)) as Configuration;

      const entities = _.concat(
        settings.entities as [],
        CoreEntityCollection
      ).filter((entity) => !_.isUndefined(entity));
      // const migrations = _.concat(
      //   settings.migrations as [],
      //   CoreMigrationCollection
      // ).filter((migration) => !_.isUndefined(migration));

      return _.defaults({}, { entities }, settings);
    };

    const defaults = _.defaults(
      {},
      { useFactory: useFactoryWrapper },
      configuration
    );

    return {
      module: DatasourceModule,
      imports: [TypeOrmModule.forRootAsync(defaults)],
      exports: [TypeOrmModule],
    };
  }
}
