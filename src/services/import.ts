import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class ImportServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  importProduct = (data: any) => this.create(data);
}

const importProductServices = new ImportServices('product/import', API_TYPE.PRODUCT);

export { importProductServices };
