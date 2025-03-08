import { Module } from '@nestjs/common';
import { HealthModule } from './health';

@Module({
  controllers: [],
  providers: [],
  exports: [HealthModule],
})
export class CoreModule {}
