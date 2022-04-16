import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseMaterialServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getWarehouseMarerialsByLocation = (data: any) => this.search(data, '/search');
}

const warehouseMaterialServices = new WarehouseMaterialServices(
  'warehouseMaterial',
  API_TYPE.WAREHOUSE,
);

export { warehouseMaterialServices };
