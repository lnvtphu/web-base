import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class OutsourcerServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getOutsourcers = (data: object) => this.search(data, '/search');

  createOutsourcer = (data: any, URLs: any[]) => this.create(data, URLs);

  updateOutsourcer = (data: any, urls: any) => this.update(data, urls);

  getOutsourcerById = (id: string) => this.getByQuery(id);

  deleteOutsourcer = (URLs: any[]) => this.delete(URLs);

  getHistorys = (data: object) => this.search(data, '/history/search');
}

const outsourcerServices = new OutsourcerServices('outMachining', API_TYPE.PRODUCT);

export { outsourcerServices };
