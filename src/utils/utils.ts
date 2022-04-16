import { parse } from 'querystring';
import api from '../../config/api';
import UserStorage from '@/storage/user.storage';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function hexToRgb(hex: string, isBg: boolean) {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${
          isBg ? 0.25 : 1
        })`
      : null;
  } catch (error) {
    return null;
  }
}

export function accessKeyToList(array: any[]) {
  if (!Array.isArray(array)) return [];
  const cloneArray = array.map((item, idx) => {
    const cloneItem = { ...item };
    cloneItem.key = idx;
    return cloneItem;
  });
  return cloneArray;
}

export function processDataWorkpieceNormDetail(items: any[]) {
  return items.map((it: any) => {
    const { stageQuotas = [], rawProductId, rawProductName, rawProductUniqueId } = it;
    let quotas: any[] = [];
    if (stageQuotas) {
      const firstElement = stageQuotas[0];
      quotas = firstElement ? firstElement.quotas : [];
    }
    const itClone = {
      id: rawProductId,
      name: rawProductName,
      rawProductUniqueId,
      quotas,
    };
    return itClone;
  });
}

export function hasExistTreeSelect(
  list: any[],
  valueCompare: string,
  hasExistCurrent: boolean = false,
  setObject: any | undefined = undefined,
): boolean {
  let hasExist = hasExistCurrent;
  list.some((it: any) => {
    if (it.value === valueCompare) {
      hasExist = true;
      if (setObject) {
        Object.assign(setObject, it);
      }
      return true;
    }
    if (it.children) {
      hasExist = hasExistTreeSelect(it.children, valueCompare, hasExist, setObject);
      return hasExist;
    }
    return false;
  });
  return hasExist;
}

export const handleFileUrl = (urlImage: string) => {
  const { core } = api[REACT_APP_ENV || 'dev'];
  return `${core}/file?fileUrl=${urlImage}`;
};

export const getOptionIdAsValue = (categories: any[]) => {
  return categories.map((it, idx) => {
    return { value: it.id, label: it.name, key: idx.toString() };
  });
};

export const getOptionNameAsValue = (categories: any[]) => {
  return categories.map((it, idx) => {
    return { value: it.name, label: it.name, key: idx.toString() };
  });
};

export const getFormDynamicValid = (datas: any[], fields: string[]) => {
  const rs: any[] = [];
  if (Array.isArray(datas) && Array.isArray(fields)) {
    datas.forEach((data) => {
      let valid = true;
      fields.some((field) => {
        if (!data[field]) {
          valid = false;
          return true;
        }
        return false;
      });
      if (valid) {
        rs.push(data);
      }
    });
  }
  return rs;
};

export const getPropertiesValid = (properties: any[]) => {
  const rs: any[] = [];
  if (Array.isArray(properties)) {
    properties.map((it) => {
      const { name, value } = it || {};
      if (name && value) {
        rs.push(it);
      }
      return true;
    });
  }
  return rs;
};

export const removeNullProperties = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  }
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const hasProperties = value && Object.keys(value).length > 0;
    if (value === null) {
      // eslint-disable-next-line no-param-reassign
      delete data[key];
    } else if (typeof value !== 'string' && hasProperties) {
      removeNullProperties(value);
    }
  });
  return data;
};

export const localeCompareUtil = (valueA: any, valueB: any) => {
  const preValue = valueA || '';
  return preValue.localeCompare(valueB);
};

/**
 * Method formats a number using fixed-point notation.
 * @param fDigit fraction digit
 * @param value number need to format
 * @returns
 */
export const fixedNumber = (fDigit: number, value?: number | string) => {
  return value ? parseFloat(Number(value).toFixed(fDigit)) : value;
};

export const stringToASCII = (str: string) => {
  try {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  } catch {
    return '';
  }
};

export const searchASCII = (keyword: string, original: string) => {
  const originalToASCII = stringToASCII(original.toLowerCase());
  const keywordToASCII = stringToASCII(keyword.toLowerCase());
  return originalToASCII.includes(keywordToASCII);
};

export const downloadFile = (fileUrl: string) => {
  const link = document.createElement('a');
  link.href = handleFileUrl(fileUrl);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const hasPermission = (permission: string) => {
  const accessRights = UserStorage.getAccessRights();
  return accessRights.includes(permission);
};
export function getOriginString(data: string, char: string) {
  const newData = data.split(char);
  return newData[newData.length - 1];
}
