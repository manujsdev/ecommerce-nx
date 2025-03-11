import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export type Configuration = TypeOrmModuleOptions;
export type ConfigurationAsync = TypeOrmModuleAsyncOptions;

export type Result<TEntity = object> =
  | null
  | TEntity
  | TEntity[]
  | {
      entities: TEntity[];
      total: number;
    };
