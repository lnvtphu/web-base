import { BaseService } from '@/services/base';
import { API_TYPE } from '@/utils/constants';

class SettingGeneralServices extends BaseService {
  constructor(pathName: string, type: string = '') {
    super(pathName, type);
    this.pathname = pathName;
    this.type = type;
  }

  getSettingGeneral = () => this.getByQuery('getAll');

  getSettingByName = (name: string) => this.getByQuery(`settingname/${name}`);

  updateSettingGeneral = (data: object, url: any[]) => this.update(data, url);
}

const settingGeneralServices = new SettingGeneralServices('setting', API_TYPE.CORE);

export { settingGeneralServices };
