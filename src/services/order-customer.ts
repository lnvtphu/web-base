import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class OrderCustomerServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getOrders = (data: any) => this.search(data, '/search');

  getOrderById = (id: string) => this.getByQuery(id);

  createOrder = (data: any, URLs: any[]) => this.create(data, URLs);

  updateOrder = (data: any, urls: any) => this.update(data, urls);

  deleteOrder = (URLs: any[]) => this.delete(URLs);

  getOderDetailsByCustomerId = (data: any) => this.search(data, '/detail/search');

  changeAction = (data: any, urls: any) => this.update(data, urls);

  getOrdersUpdateHistory = (data: any) => this.search(data, '/history/search');
}

const orderCustomerServices = new OrderCustomerServices('orderCustomer', API_TYPE.CORE);

export { orderCustomerServices };
