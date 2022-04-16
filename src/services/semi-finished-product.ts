import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class SemiFinishedProductServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getSemiFinishedProducts = (data: any) => this.search(data, '/search');

  getByProductionOrder = (urls: any) => this.getItem(urls);

  getSemiFinishedProductById = (urls: any) => this.getItem(urls);

  createSemiFinishedProduct = (data: any) => this.create(data);

  updateSemiFinishedProduct = (data: any, urls: any) => this.update(data, urls);

  deleteSemiFinishedProduct = (urls: any) => this.delete(urls);
}

const semiFinishedProductServices = new SemiFinishedProductServices(
  'semiProduct',
  API_TYPE.PRODUCT,
);

export { semiFinishedProductServices };
