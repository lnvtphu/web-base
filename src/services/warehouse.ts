import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getWarehouses = (data: any) => this.search(data, '/search');

  getWarehouseById = (id: string) => this.getByQuery(id);

  getWarehouseDetailById = (id: string, unit: string, locationId: string) =>
    this.getByQuery(id + '/detail?unit=' + unit + '&location=' + locationId);

  createWarehouse = (data: any, URLs: any[]) => this.create(data, URLs);

  updateWarehouse = (data: any, urls: any) => this.update(data, urls);

  getWarehouseGroups = (data: any) => this.search(data, '/groups');

  changeLocationMaterial = (data: any, urls: any) => this.update(data, urls);

  deleteWarehouse = (URLs: any[]) => this.delete(URLs);
}

const warehouseServices = new WarehouseServices('warehouse', API_TYPE.WAREHOUSE);

export { warehouseServices };
