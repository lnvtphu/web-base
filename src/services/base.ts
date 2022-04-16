import qs from 'qs';
import api from '../../config/api';
import { request } from '../utils/authority';
import { API_TYPE } from '@/utils/constants';

type URL = {
  id?: number | string;
  path?: string;
};

/**
 * @Author Phu Le
 * @Description The base service to call API
 */
export class BaseService {
  pathname: string;
  type: string;
  constructor(pathName: string, type: string) {
    this.pathname = pathName;
    this.type = type;
  }
  /**
   * @Usage
   * Excluding search method
   * URLs is a array include id and path
   * The first item must be an object with only id property
   * eg: this.pathname is "locations"
   * - [] => http://192.168.80.61:8181/locations
   * - [ {id: 2} ]
   *    => http://192.168.80.61:8181/locations/2
   * - [ {id: 2}, {id: 1, path: 'checkpoint'} ]
   *    => http://192.168.80.61:8181/locations/2/checkpoint/1
   * - [{ id: 2 }, { path: "checkpoint" }, { path: 'search'}];
   *    => http://192.168.80.61:8181/locations/2/checkpoint/search
   */

  baseUrl(URLs: URL[] = []) {
    const { core, product, warehouse, export: exportPort } = api[REACT_APP_ENV || 'dev'];
    let url = new URL(core);
    let paths = '';

    switch (this.type) {
      case API_TYPE.PRODUCT:
        url = new URL(product);
        break;
      case API_TYPE.WAREHOUSE:
        url = new URL(warehouse);
        break;
      case API_TYPE.EXPORT:
        url = new URL(exportPort);
        break;
      default:
        url = new URL(core);
        break;
    }

    if (Array.isArray(URLs)) {
      URLs.map((item) => {
        const { id, path = this.pathname } = item;
        paths = `${paths}${path ? `/${path}` : ''}${id ? `/${id}` : ''}`;
        return true;
      });
    }
    url.pathname = paths || this.pathname;
    return url.toString();
  }

  getItem(URLs: URL[], queryParams = {}) {
    let url = this.baseUrl(URLs);
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  getByQuery(query: string) {
    const url = `${this.baseUrl()}/${query}`;
    return request(url, 'GET');
  }

  getItems(queryParams = {}) {
    let url = this.baseUrl();
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  create(data: object, URL: URL[] | string = '', queryParams = {}) {
    const typeURL = typeof URL === 'string';
    let url = typeURL ? this.baseUrl() + URL : this.baseUrl(URL);
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'POST', data);
  }

  search(data: object = {}, midURL: URL[] | string = '') {
    const typeURL = typeof midURL === 'string';
    const url = typeURL ? this.baseUrl() + midURL : this.baseUrl(midURL);
    return request(url, 'POST', data);
  }

  update(data: object, URLs: URL[] = []) {
    const url = this.baseUrl(URLs);
    return request(url, 'PUT', data);
  }

  updateNoId(data: object) {
    const url = this.baseUrl();
    return request(url, 'PUT', data);
  }

  delete(URLs: URL[]) {
    const url = this.baseUrl(URLs);
    return request(url, 'DELETE');
  }

  getItemsNoEndcode(queryParams = {}) {
    let url = this.baseUrl();
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  upload(data: object, queryParams: string = '', urls?: []) {
    let url = this.baseUrl(urls);
    url = queryParams ? `${url}?${queryParams}` : url;
    return request(url, 'POST', data, true);
  }
}
