import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class SemiFinishedProductNormServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getSemiFinishedProductNorms = (data: object) => this.getByQuery('getAllSemiProductQuota');

  createSemiFinishedProductNorm = (data: object) =>
    this.create(data, [{ path: 'quota/createOrUpdateSemiProductQuota' }]);

  getSemiFinishedProductNormById = (id: string) =>
    this.getByQuery(`getSemiProductQuotaDetail/${id}`);

  getAllSemiProductQuotaOrNonQuota = (query: string) => this.getByQuery(query);

  deleteSemiFinishedProductNorm = (id: string) =>
    this.delete([{ path: 'quota/deleteSemiProductQuota', id }]);
}

const semifinishedProductNormServices = new SemiFinishedProductNormServices(
  'quota',
  API_TYPE.PRODUCT,
);

export { semifinishedProductNormServices };
