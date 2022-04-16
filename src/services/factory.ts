import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class FactoryServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getFactories = (data: any) => this.search(data, '/search');

  getFactoryById = (id: string) => this.getByQuery(id);

  createFactory = (data: any, URLs: any[]) => this.create(data, URLs);

  updateFactory = (data: any, urls: any) => this.update(data, urls);

  deleteFactory = (URLs: any[]) => this.delete(URLs);
}

const factoryServices = new FactoryServices('factory', API_TYPE.CORE);

export { factoryServices };
