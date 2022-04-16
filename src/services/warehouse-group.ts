import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseGroupServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getWarehousesGroups = (data: any) => this.search(data, '/search');
}

const warehouseGroupServices = new WarehouseGroupServices('warehouseGroup', API_TYPE.WAREHOUSE);

export { warehouseGroupServices };
