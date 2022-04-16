import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class WorkpieceNormServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  // Workpiece Norms

  getWorkpieceNorms = (data: any) => this.search(data, '/search');

  getAllWorkpieceNorms = (URLs: any[]) => this.getItem(URLs);

  createWorlpieceNorms = (data: any, URLs: any[]) => this.create(data, URLs);

  getAllRawProductQuota = (URLs: any[], queryParams: any) => this.getItem(URLs, queryParams);

  deleteAllRawQuotaInSemiProduct = (URLs: any) => this.delete(URLs);

  // Workpiece

  getWorkpieces = (data: any) => this.search(data, '/search');

  getWorkpieceById = (URLs: any) => this.getItem(URLs);

  createWorkpiece = (data: any, URLs: any[]) => this.create(data, URLs);

  updateWorkpiece = (data: any, URLs: any[]) => this.update(data, URLs);

  deleteWorkpiece = (URLs: any) => this.delete(URLs);
}

const workpieceNormServices = new WorkpieceNormServices('quota', API_TYPE.PRODUCT);

const workpieceServices = new WorkpieceNormServices('rawProduct', API_TYPE.PRODUCT);

export { workpieceNormServices, workpieceServices };
