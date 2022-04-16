import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class ExportService extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  exportRequestMaterial = (data: any, URLs: any[]) => this.create(data, URLs);

  exportProductionInprogress = (data: any) => this.search(data, '/progressProduct');
}

const exportService = new ExportService('export', API_TYPE.EXPORT);

export { exportService };
