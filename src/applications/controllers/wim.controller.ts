import { Controller, Get, Inject, Logger, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WimServicePort } from '@domain/services';
import { CRON_SERVICES, SERVICES } from '@infrastructure/shared/enum';
import { EcmWimSearchRequest } from '@applications/schemas/request/ecm-search.request';
import { PaginationRequest } from '@applications/schemas/shared/request/pagination.shared';
import { PaginationResponse } from '@applications/schemas/shared/response/paginated.shared';

@ApiTags('WIM (Weight in Motion)')
@Controller('wim')
export class WimController {
  private readonly logger: Logger;
  constructor(
    @Inject(SERVICES.WIM_SERVICE)
    private readonly _wimService: WimServicePort,
  ) {
    this.logger = new Logger(CRON_SERVICES.ECM_WIM_CRON_SERVICE);
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async ecmWimEventTask() {
  //   this.logger.log('⏱️ Triggering SOAP from ECM...');
  //   await this._wimService.ecmWimEventTask();
  // }

  @Post('/')
  async ecmWimEventTest(): Promise<boolean> {
    return await this._wimService.createEcmWimDataEventTask();
  }

  @Get('/')
  async getEcmWimData(
    @Query() query: PaginationRequest,
  ): Promise<PaginationResponse<any>> {
    return await this._wimService.getEcmWimData(query);
  }

  @Get('/search')
  async test(@Query() query: EcmWimSearchRequest): Promise<any> {
    return query;
  }
}
