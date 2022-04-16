import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class CustomerServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getCustomers = (data: any) => this.search(data, '/search');

  getCustomerById = (id: string) => this.getByQuery(id);

  createCustomer = (data: any, URLs: any[]) => this.create(data, URLs);

  updateCustomer = (data: any, urls: any) => this.update(data, urls);

  deleteCustomer = (URLs: any[]) => this.delete(URLs);
}

const customerServices = new CustomerServices('customer', API_TYPE.CORE);

export { customerServices };
