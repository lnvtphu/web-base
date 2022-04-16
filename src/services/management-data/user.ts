import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class UserManagementServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getUserManagements = (data: object) => this.search(data, '/search');

  createUserManagement = (data: object) => this.create(data);

  updateUserManagement = (data: object, url: any[]) => this.update(data, url);

  getUserManagementById = (id: string) => this.getByQuery(id);

  deleteUserManagementById = (id: string) => this.delete([{ id }]);
}

const userManagementServices = new UserManagementServices('user', API_TYPE.CORE);

export { userManagementServices };
