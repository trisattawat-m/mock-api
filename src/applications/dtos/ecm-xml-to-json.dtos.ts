import {
  Axles,
  CentralizeCenterWimRequest,
} from '@applications/schemas/request/centralized-service.request';

export function mapVehicleXmlToDto(
  vehicleXml: any,
): CentralizeCenterWimRequest {
  const v = vehicleXml;
  const dto = new CentralizeCenterWimRequest();
  const attrs = v._attributes;

  dto.crossingIndexCode = attrs.ID_;
  dto.datetime = new Date(attrs.DATE_VEH_);
  dto.plate = attrs.PLATE_NUM_FRONT_ANPR_ || '-';
  dto.plate_province = attrs.COUNTRY_CODE_FRONT_ANPR_ || '';
  dto.total_axles = Number(v.Axle?.length || 0);
  dto.total_length = Number(v.Measure?._attributes?.LENG || 0);
  dto.total_width = 0;
  dto.outcome = '';
  dto.total_weight = Number(v.Measure?._attributes?.TOWT_KG_ || 0);
  dto.weight_limit = 0;
  dto.speed = Number(v.Measure?._attributes?.SPEE || 0);
  dto.vehicle_type = '';
  dto.vehicle_class = v.Category?._attributes?.CA || '';
  dto.lane = attrs.LN || '';
  dto.overview_image = '';
  dto.plate_image = '';
  dto.axles = (v.Axle || []).map((ax: any) => {
    const a = ax._attributes;
    const axle = new Axles();
    axle.weight = Number(a.WT_);
    axle.left_weight = Number(a.WTL_);
    axle.right_weight = Number(a.WTR_);
    return axle;
  });

  return dto;
}
