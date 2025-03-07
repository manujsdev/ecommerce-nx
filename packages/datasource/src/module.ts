import { DynamicModule, Logger, Module } from '@nestjs/common';
import { Configuration, ConfigurationAsync } from './types';
import CoreEntityCollection from './entities';
import CoreMigrationCollection from './migrations';
import _ from 'lodash';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({})
export class DatasourceModule {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleDestroy() {
    try {
      await this.dataSource.destroy();
      Logger.debug('DataSource has been successfully destroyed.');
    } catch (error) {
      Logger.error('Error while destroying the DataSource', error);
    }
  }

  async onModuleInit() {
    const pending = await this.dataSource.showMigrations();
    const migrations = await this.dataSource.runMigrations();

    const initial = migrations.find(
      (migration) => migration.name === 'Init1741379248657'
    );

    if (initial && pending) {
      Logger.warn(`Resetting database...`);

      await this.dataSource.synchronize(true);
      await this.dataSource.runMigrations();
    }
  }

  static forRootAsync(configuration: ConfigurationAsync): DynamicModule {
    const useFactoryWrapper = async (...parameters: any) => {
      const factory =
        configuration.useFactory || (_.noop as () => Configuration);

      const settings = (await factory(...parameters)) as Configuration;

      const entities = _.concat(
        settings.entities as [],
        CoreEntityCollection
      ).filter((entity) => !_.isUndefined(entity));
      const migrations = _.concat(
        settings.migrations as [],
        CoreMigrationCollection
      ).filter((migration) => !_.isUndefined(migration));

      return _.defaults({}, { entities, migrations }, settings);
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
