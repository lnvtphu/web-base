import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class CategoriesServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getCategories = (data: any) => this.search(data, '/search');

  createCategory = (data: object) => this.create(data);

  updateCategory = (data: object, url: any) => this.update(data, url);

  deleteCategory = (id: string) => this.delete([{ id }]);
}

const categoryServices = new CategoriesServices('category', API_TYPE.PRODUCT);

export { categoryServices };
