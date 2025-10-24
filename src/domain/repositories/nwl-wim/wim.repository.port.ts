import { CentralizeCenterWimRequest } from '@applications/schemas/request/centralized-service.request';
import { PaginationRequest } from '@applications/schemas/shared/request/pagination.shared';
import { PaginationResponse } from '@applications/schemas/shared/response/paginated.shared';

export interface WimRepositoryPort {
  saveWimData(data: CentralizeCenterWimRequest[]): Promise<void>;
  getWimData(query: PaginationRequest): Promise<{ data: any[]; total: number }>;
}
