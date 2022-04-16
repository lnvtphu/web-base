import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WarehouseExportServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getWarehouseExportById = (id: string) => this.getByQuery(id);

  createReceiptExport = (data: any, URLs: any[]) => this.create(data, URLs);

  updateReceiptExport = (data: any, urls: any) => this.update(data, urls);

  getReceiptExport = (data: any) => this.search(data, '/search');

  deliverWarehouse = (data: any, urls: any) => this.update(data, urls);

  deleteReceiptExport = (URLs: any[]) => this.delete(URLs);
}

const warehouseExportServices = new WarehouseExportServices('warehouseExport', API_TYPE.WAREHOUSE);

export { warehouseExportServices };
