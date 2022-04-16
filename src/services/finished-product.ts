import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class FinishedProductServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getFinishedProductsTree = (data: object) => this.search(data, '/searchForDdl');

  getFinishedProducts = (data: object) => this.search(data, '/search');

  createFinishedProduct = (data: object) => this.create(data);

  updateFinishedProduct = (data: object, url: any[]) => this.update(data, url);

  getFinishedProductById = (id: string) => this.getByQuery(id);

  deleteFinishedProductById = (id: string) => this.delete([{ id }]);

  summaryQuotaOfProduct = (payload: any[]) =>
    this.create(payload, [{ path: 'product/summaryQuotaOfProduct' }]);

  copyFinishedProduct = (data: any, URLs: any[]) => this.create(data, URLs);
}

const finishedProductServices = new FinishedProductServices('product', API_TYPE.PRODUCT);

export { finishedProductServices };
