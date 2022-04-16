import BaseStorage from './base.storage';
import * as STORAGE_KEYS from './keys';

function GeneralSettingStorage(...arg: any) {
  BaseStorage.apply(this, arg);
}

GeneralSettingStorage.prototype = Object.create(BaseStorage.prototype);

GeneralSettingStorage.prototype.constructor = GeneralSettingStorage;

GeneralSettingStorage.prototype.setCodeSetting = function (setting: any) {
  this.set(STORAGE_KEYS.GENERAL_SETTING.CODE_SETTING, setting);
};

GeneralSettingStorage.prototype.resetCodeSetting = function () {
  this.remove(STORAGE_KEYS.GENERAL_SETTING.CODE_SETTING);
};

GeneralSettingStorage.prototype.getCodeSetting = function () {
  const codeSetting = this.get(STORAGE_KEYS.GENERAL_SETTING.CODE_SETTING);
  return codeSetting === null ? {} : codeSetting;
};

export default new GeneralSettingStorage();
