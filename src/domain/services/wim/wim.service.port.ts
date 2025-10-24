import { PaginationRequest } from '@applications/schemas/shared/request/pagination.shared';
import { PaginationResponse } from '@applications/schemas/shared/response/paginated.shared';

export interface WimServicePort {
  createEcmWimDataEventTask(): Promise<any>;
  getEcmWimData(query: PaginationRequest): Promise<PaginationResponse<any>>;
}
