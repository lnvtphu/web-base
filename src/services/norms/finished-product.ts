import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class FinishedProductNormServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getFinishedProductNorms = (query: object) =>
    this.getItem([{ path: 'quota/getAllProductQuota' }], query);

  createFinishedProductNorm = (data: object) =>
    this.create(data, [{ path: 'quota/createOrUpdateProductQuota' }]);

  getFinishedProductNormById = (id: string) => this.getByQuery(`getProductQuotaDetail/${id}`);

  deleteFinishedProductNorm = (id: string) =>
    this.delete([{ path: 'quota/deleteProductQuota', id }]);
}

const finishedProductNormServices = new FinishedProductNormServices('quota', API_TYPE.PRODUCT);

export { finishedProductNormServices };
