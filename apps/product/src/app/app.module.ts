import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatasourceModule } from '@ecommerce-nx/datasource';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    DatasourceModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: configuration().postgres_host,
          port: configuration().postgres_port,
          username: configuration().postgres_user,
          password: configuration().postgres_password,
          database: configuration().postgres_database,
          logging: false,
          poolSize: 8,
          applicationName: 'product',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
