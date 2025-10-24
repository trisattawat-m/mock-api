import { CentralizeCenterWimRequest } from '@applications/schemas/request/centralized-service.request';

export interface WimRepositoryPort {
  saveWimData(data: CentralizeCenterWimRequest[]): Promise<void>;
}
