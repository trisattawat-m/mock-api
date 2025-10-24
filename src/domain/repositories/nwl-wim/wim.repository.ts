import { Injectable } from '@nestjs/common';
import { WimRepositoryPort } from './wim.repository.port';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { CentralizeCenterWimRequest } from '@applications/schemas/request/centralized-service.request';
import { PaginationRequest } from '@applications/schemas/shared/request/pagination.shared';
import { PaginationResponse } from '@applications/schemas/shared/response/paginated.shared';

@Injectable()
export class WimRepository implements WimRepositoryPort {
  constructor(private readonly _prisma: PrismaService) {}

  async saveWimData(data: CentralizeCenterWimRequest[]): Promise<void> {
    for (const dto of data) {
      try {
        await this._prisma.wimBacklog.upsert({
          where: { crossingIndexCode: dto.crossingIndexCode },
          update: {
            datetime: dto.datetime,
            plate: dto.plate,
            plateProvince: dto.plate_province,
            totalAxles: dto.total_axles,
            totalLength: dto.total_length,
            totalWidth: dto.total_width,
            outcome: dto.outcome,
            totalWeight: dto.total_weight,
            weightLimit: dto.weight_limit,
            speed: dto.speed,
            vehicleClass: dto.vehicle_class,
            vehicleType: dto.vehicle_type,
            lane: dto.lane,
            overviewImage: dto.overview_image,
            plateImage: dto.plate_image,
            axlesJson: JSON.stringify(dto.axles),
          },
          create: {
            crossingIndexCode: dto.crossingIndexCode,
            datetime: dto.datetime,
            plate: dto.plate,
            plateProvince: dto.plate_province,
            totalAxles: dto.total_axles,
            totalLength: dto.total_length,
            totalWidth: dto.total_width,
            outcome: dto.outcome,
            totalWeight: dto.total_weight,
            weightLimit: dto.weight_limit,
            speed: dto.speed,
            vehicleClass: dto.vehicle_class,
            vehicleType: dto.vehicle_type,
            lane: dto.lane,
            overviewImage: dto.overview_image,
            plateImage: dto.plate_image,
            axlesJson: JSON.stringify(dto.axles),
          },
        });
      } catch (error) {
        console.error('Error in saveWimData:', error);
        throw new Error('Failed to save WIM data');
      }
    }
  }

  async getWimData(
    query: PaginationRequest,
  ): Promise<{ data: any[]; total: number }> {
    const { page = 1, perPage = 20, sortBy, sortOrder = 'asc' } = query;

    const skip = (page - 1) * perPage;
    const orderBy =
      sortBy && ['asc', 'desc'].includes(sortOrder)
        ? { [sortBy]: sortOrder }
        : undefined;

    const [data, total] = await Promise.all([
      this._prisma.wimBacklog.findMany({
        skip,
        take: perPage,
        orderBy,
      }),
      this._prisma.wimBacklog.count(),
    ]);

    return { data, total };
  }
}
