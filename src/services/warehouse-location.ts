import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseLocationServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getLocationsByWarehouseId = (id: string) => this.getByQuery('?warehouseId=' + id);

  createWarehouseLocation = (data: any, URLs: any[]) => this.create(data, URLs);
}

const warehouseLocationServices = new WarehouseLocationServices(
  'warehouseLocation',
  API_TYPE.WAREHOUSE,
);

export { warehouseLocationServices };
