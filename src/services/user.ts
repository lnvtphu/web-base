import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class UserServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getStageManagers = (url: any) => this.getByQuery('getStageManagers');

  getStageCurator = (url: any) => this.getByQuery('getStageCurator');

  getCurrentUser = () => this.getByQuery('myProfile');

  updateCurrentUser = (data: object) => this.update(data, [{ path: 'user/myProfile' }]);
}

const userServices = new UserServices('user', API_TYPE.CORE);

export { userServices };
