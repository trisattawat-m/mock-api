import { Expose } from 'class-transformer';

export class EcmWimResponse {
  @Expose()
  message?: string;
}
