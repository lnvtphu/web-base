import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class SupplierServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getSuppliers = (data: any) => this.search(data, '/search');

  getSupplierById = (id: string) => this.getByQuery(id);

  createSupplier = (data: any, URLs: any[]) => this.create(data, URLs);

  updateSupplier = (data: any, urls: any) => this.update(data, urls);

  deleteSupplier = (URLs: any[]) => this.delete(URLs);

  getMaterialsBySupplierId = (id: string) => this.getByQuery(id + '/materials');
}

const supplierServices = new SupplierServices('supplier', API_TYPE.CORE);

export { supplierServices };
