import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@infrastructure/filters/exception.filter';
import { LoggerMiddleware } from '@infrastructure/middleware/logger.middleware';
import { HealthModule } from './health.module';
import { WimModule } from './wim.module';
@Module({
  imports: [ScheduleModule.forRoot(), HealthModule, WimModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
