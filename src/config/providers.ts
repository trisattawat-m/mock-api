import {
  CentralizeCenterAdapter,
  CentralizeCenterAdapterPort,
} from '@domain/adapters';
import { EcmWimAdapter } from '@domain/adapters/ecm-wim/ecm-wim.adapter';
import { EcmWimAdapterPort } from '@domain/adapters/ecm-wim/ecm-wim.adapter.port';
import { WimRepository, WimRepositoryPort } from '@domain/repositories';
import { WimService } from '@domain/services';
import { ADAPTERS, REPOSITORY, SERVICES } from '@infrastructure/shared/enum';
import { Provider } from '@nestjs/common';

//services provider
export const WimServiceProvider: Provider = {
  provide: SERVICES.WIM_SERVICE,
  useFactory(
    CentralizeCenterAdapter: CentralizeCenterAdapterPort,
    WimRepository: WimRepositoryPort,
    EcmWimAdapter: EcmWimAdapterPort,
  ) {
    return new WimService(
      CentralizeCenterAdapter,
      WimRepository,
      EcmWimAdapter,
    );
  },
  inject: [
    ADAPTERS.CENTRALIZE_CENTER_ADAPTER,
    REPOSITORY.WIM_REPOSITORY,
    ADAPTERS.ECM_WIM_ADAPTER,
  ],
};

//adapters provider
export const CentralizeCenterAdapterProvider: Provider = {
  provide: ADAPTERS.CENTRALIZE_CENTER_ADAPTER,
  useClass: CentralizeCenterAdapter,
};

export const EcmWimAdapterProvider: Provider = {
  provide: ADAPTERS.ECM_WIM_ADAPTER,
  useClass: EcmWimAdapter,
};

//repositories provider
export const WimRepositoryProvider: Provider = {
  provide: REPOSITORY.WIM_REPOSITORY,
  useClass: WimRepository,
};
