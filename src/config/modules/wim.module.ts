import { Module } from '@nestjs/common';
import {
  WimServiceProvider,
  CentralizeCenterAdapterProvider,
  WimRepositoryProvider,
  EcmWimAdapterProvider,
} from '@config/providers';
import { WimController } from '@applications/controllers/wim.controller';
import { PrismaModule } from './prisma.module';
import { EcmWimConfig } from '@config/config';

@Module({
  imports: [PrismaModule],
  controllers: [WimController],
  providers: [
    EcmWimConfig,
    WimServiceProvider,
    CentralizeCenterAdapterProvider,
    WimRepositoryProvider,
    EcmWimAdapterProvider,
  ],
})
export class WimModule {}
