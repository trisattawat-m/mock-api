import { Injectable } from '@nestjs/common';
import { CentralizeCenterAdapterPort } from './centralize-center.adapter.port';

@Injectable()
export class CentralizeCenterAdapter implements CentralizeCenterAdapterPort {
  constructor() {}

  getTrigger(): string {
    return 'DAHUA';
  }
}
