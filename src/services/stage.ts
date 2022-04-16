import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class StageServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getStages = (data: object) => this.search(data, '/search');

  getStagesByStageGroup = (url: any) => this.getItem(url);

  createStage = (data: object) => this.create(data);

  updateStage = (data: object, url: any) => this.update(data, url);

  deleteStage = (URLs: any[]) => this.delete(URLs);
}

const stageServices = new StageServices('stage', API_TYPE.PRODUCT);

export { stageServices };
