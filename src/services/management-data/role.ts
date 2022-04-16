import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class RoleServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getRoles = () => this.getItem([{}, { path: 'getAll' }]);

  getRoleById = (URLs: any[]) => this.getItem(URLs);

  updateRole = (data: any, URLs: any[]) => this.update(data, URLs);

  createRole = (data: any, URLs: any[]) => this.create(data, URLs);

  deleteRole = (URLs: any[]) => this.delete(URLs);
}

const roleServices = new RoleServices('role', API_TYPE.CORE);

export { roleServices };
