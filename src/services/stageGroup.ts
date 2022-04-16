import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class StageGroupServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getStageGroups = () => this.getByQuery('getAll');

  createStageGroup = (data: object) => this.create(data);

  searchStageGroups = (data: object) => this.search(data, '/search');

  updateStageGroup = (data: object, url: any) => this.update(data, url);

  deleteStageGroup = (URLs: any[]) => this.delete(URLs);
}

const stageGroupServices = new StageGroupServices('stageGroup', API_TYPE.PRODUCT);

export { stageGroupServices };
