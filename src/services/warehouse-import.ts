import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseImportServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getWarehouseImportById = (id: string) => this.getByQuery(id);

  getReceiptImport = (data: any) => this.search(data, '/search');

  createReceiptImport = (data: any, URLs: any[]) => this.create(data, URLs);

  updateReceiptImport = (data: any, urls: any) => this.update(data, urls);

  receiveWarehouse = (data: any, urls: any) => this.update(data, urls);

  deleteReceiptImport = (URLs: any[]) => this.delete(URLs);
}

const warehouseImportServices = new WarehouseImportServices('warehouseImport', API_TYPE.WAREHOUSE);

export { warehouseImportServices };
