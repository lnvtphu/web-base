import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class MaterialServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }
  getMaterials = (data: any) => this.search(data, '/search');

  getMaterialById = (URLs: any[]) => this.getItem(URLs);

  getCategory = (data: any) => this.search(data, '/search');

  createMaterial = (data: any, URLs: any[]) => this.create(data, URLs);

  updateMaterial = (data: any, URLs: any[]) => this.update(data, URLs);

  deleteMaterial = (URLs: any[]) => this.delete(URLs);
}

const materialServices = new MaterialServices('material', API_TYPE.PRODUCT);

const categoryServices = new MaterialServices('category', API_TYPE.PRODUCT);

export { materialServices, categoryServices };
