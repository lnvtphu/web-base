import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class MachiningExportServices extends BaseService {
  // pathname: string;
  // type: string;
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getMachiningProgress = (data: object) => this.search(data, '/progress/search');

  getMachiningExports = (data: object) => this.search(data, '/search');

  createMachiningExport = (data: object) => this.create(data);

  updateMachiningExport = (data: object, url: any[]) => this.update(data, url);

  getMachiningExportById = (id: string) => this.getByQuery(id);

  deleteMachiningExportById = (id: string) => this.delete([{ id }]);
}

const machiningExportServices = new MachiningExportServices('machiningExport', API_TYPE.PRODUCT);

export { machiningExportServices };
