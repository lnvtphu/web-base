import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class ProductionProgressServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getAllProductionProgress = (data: any) => this.search(data, '/search');

  getDetailProductionProgress = (data: any) => this.search(data, '/detail');

  getReportProductionProgress = (data: any) => this.search(data, '/report');

  getReportMassOfIron = (data: any) =>
    this.getItem([{ path: 'productionProgress' }, { path: 'getReportMassOfIron' }], data);

  updateDetailProductionProgress = (data: any, URLs: any[]) => this.update(data, URLs);
}

const productionProgressServices = new ProductionProgressServices(
  'productionProgress',
  API_TYPE.PRODUCT,
);

export { productionProgressServices };
