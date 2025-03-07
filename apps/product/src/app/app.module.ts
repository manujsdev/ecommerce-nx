import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatasourceModule } from '@ecommerce-nx/datasource';
import configuration from '../config/configuration';

@Module({
  imports: [
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
