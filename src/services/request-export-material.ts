import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class RequestExportMaterialServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getRequestExportMaterialById = (id: string) => this.getByQuery(id);

  getRequestExportMaterials = (data: any) => this.search(data, '/search');

  createRequestExportMaterial = (data: any, URLs: any[]) => this.create(data, URLs);

  updateRequestExportMaterial = (data: any, urls: any) => this.update(data, urls);

  deleteRequestExportMaterial = (URLs: any[]) => this.delete(URLs);

  deliverRequestExportMaterial = (data: any, urls: any) => this.update(data, urls);

  rejectRequestExportMaterial = (data: any, urls: any) => this.update(data, urls);
}

const requestExportMaterialServices = new RequestExportMaterialServices(
  'requestExportMaterial',
  API_TYPE.PRODUCT,
);

export { requestExportMaterialServices };
