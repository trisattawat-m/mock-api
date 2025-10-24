import { Injectable } from '@nestjs/common';
import { WimServicePort } from './wim.service.port';
import { CentralizeCenterAdapterPort } from '@domain/adapters';
import { WimRepositoryPort } from '@domain/repositories';
import { EcmWimAdapterPort } from '@domain/adapters/ecm-wim/ecm-wim.adapter.port';
import { mapVehicleXmlToDto } from '@applications/dtos/ecm-xml-to-json.dtos';
import * as convert from 'xml-js';
import { BadRequestError } from '@infrastructure/shared/exceptions/http-error';
import { DOMAIN } from '@infrastructure/shared/enum';
import { PaginationRequest } from '@applications/schemas/shared/request/pagination.shared';
import { PaginationResponse } from '@applications/schemas/shared/response/paginated.shared';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WimService implements WimServicePort {
  constructor(
    private readonly _centralizeCenterAdapter: CentralizeCenterAdapterPort,
    private readonly _wimRepository: WimRepositoryPort,
    private readonly _ecmWimAdapter: EcmWimAdapterPort,
  ) {}

  async createEcmWimDataEventTask(): Promise<boolean> {
    try {
      const xmlResponse = await this._ecmWimAdapter.createEcmWimDataEventTask();

      const xmlObj = JSON.parse(
        convert.xml2json(xmlResponse, { compact: true, spaces: 2 }),
      );

      const detections =
        xmlObj['soap:Envelope']['soap:Body'][
          'tns:ProcessVehicleDetectionResponse'
        ]['tns:ProcessVehicleDetectionResult']['VehicleDetectionCollection'][
          'Detection'
        ];

      const detectionArray = Array.isArray(detections)
        ? detections
        : [detections];

      const result = detectionArray.map((d) => mapVehicleXmlToDto(d.Vehicle));

      Promise.all([await this._wimRepository.saveWimData(result)]);

      return true;
    } catch (error) {
      console.error('Error in ecmWimEventTask:', error);
      throw new BadRequestError(DOMAIN.WIM, 'Event ECM WIM Failed', error);
    }
  }

  async getEcmWimData(
    query: PaginationRequest,
  ): Promise<PaginationResponse<any>> {
    const { data, total } = await this._wimRepository.getWimData(query);

    return new PaginationResponse(query.page, query.perPage, total, data);
  }
}
