import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class MachiningImportServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getMachiningImports = (data: object) => this.search(data, '/search');

  createMachiningImport = (data: object) => this.create(data);

  updateMachiningImport = (data: object, url: any[]) => this.update(data, url);

  getMachiningImportById = (id: string) => this.getByQuery(id);

  deleteMachiningImportById = (id: string) => this.delete([{ id }]);
}

const machiningImportServices = new MachiningImportServices('machiningImport', API_TYPE.PRODUCT);

export { machiningImportServices };
