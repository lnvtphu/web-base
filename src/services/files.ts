import { BaseService } from './base';
import { API_TYPE } from '@/utils/constants';

class FilesService extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  uploadFiles = (data: any, query: string) => this.upload(data, query);

  uploadFileWithCategories = (data: any) => this.upload(data.body, undefined, data.url);
}

const filesService = new FilesService('file', API_TYPE.CORE);

export { filesService };
