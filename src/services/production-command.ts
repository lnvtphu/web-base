import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class ProductionCommandServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getProductionCommands = (data: object) => this.search(data, '/search');

  getListProduct = (data: object) => this.search(data, '/getListProduct');

  createProductionCommand = (data: object) => this.create(data);

  updateProductionCommand = (data: object, url: any[]) => this.update(data, url);

  updateQuantityProduct = (data: object, url: any[]) => this.create(data, url);

  getProductionCommandById = (id: string) => this.getByQuery(id);

  getProductByProductionOrderId = (query: string) => this.getByQuery(query);

  getCountProductInventory = (query: string) => this.getByQuery(query);

  approveCommandProduction = (URLs: any[]) => this.getItem(URLs);

  purchase = (URLs: any[]) => this.getItem(URLs);

  rejectCommandProduction = (URLs: any[]) => this.getItem(URLs);

  deleteCommandProduction = (URLs: any[]) => this.delete(URLs);

  getListProductOrderHaveOrder = (data: object) => this.search(data, '/haveOrder');

  getProductionCommandHistory = (data: object) => this.search(data, '/history/search');
}

const productionCommandServices = new ProductionCommandServices(
  'productionOrder',
  API_TYPE.PRODUCT,
);

export { productionCommandServices };
