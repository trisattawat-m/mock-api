import { Injectable } from '@nestjs/common';
import { EcmWimAdapterPort } from './ecm-wim.adapter.port';
import axios, { AxiosInstance } from 'axios';
import { EcmWimConfig } from '@config/config';

@Injectable()
export class EcmWimAdapter implements EcmWimAdapterPort {
  private readonly axiosInstance: AxiosInstance;
  constructor(private readonly _ecmHostConfig: EcmWimConfig) {
    this.axiosInstance = axios.create({
      baseURL: this._ecmHostConfig.host,
      timeout: 10000,
    });
  }

  async ecmWimEventTask(): Promise<any> {
    try {
      const { data: result } = await this.axiosInstance.post(
        `.netlify/functions/soap-mock/VehicleDetectionService`,
        null,
        {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
          },
        },
      );

      return result;
    } catch (error) {
      console.error('Error occurred while calling ECM WIM API:', error);
      throw error;
    }
  }
}
