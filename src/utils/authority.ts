import axios from 'axios';
import { history, formatMessage } from 'umi';
import { notification, message as messageNotify } from 'antd';
import UserStorage from '@/storage/user.storage';
import { reloadAuthorized } from './Authorized';
import { removeNullProperties } from '@/utils/utils';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  // return localStorage.getItem('jack-p') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('access_rights') : str;

  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  if (Array.isArray(authority)) {
    return authority;
  }
  return authority;
}

export const isLoggedIn = () => {
  const idToken = UserStorage.getToken();
  return !!idToken;
};

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('jack-p', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}

export const showNotification = (
  responseData: any,
  notifyConfig: any = {},
  messageType: boolean = false,
) => {
  const { ok } = responseData;
  if (ok) {
    const {
      successDescription = 'common.action.success',
      successTitle = 'common.notify',
    } = notifyConfig;
    const hasString = typeof successDescription === 'string';
    if (messageType) {
      messageNotify.success(
        hasString ? formatMessage({ id: successDescription }) : successDescription,
        3,
      );
    } else {
      notification.success({
        message: formatMessage({ id: successTitle }),
        description: hasString ? formatMessage({ id: successDescription }) : successDescription,
        duration: 3,
      });
    }
  } else {
    const { error: { message = 'common.retry.after.a.minute' } = {} } = responseData;
    const { errorTitle = 'common.action.failure', errorDescription = '' } = notifyConfig;
    const hasString = typeof errorDescription === 'string';
    if (messageType) {
      messageNotify.error(hasString ? formatMessage({ id: message }) : errorDescription, 3);
    } else {
      notification.error({
        message: formatMessage({ id: errorTitle }),
        description: hasString ? formatMessage({ id: message }) : errorDescription,
        duration: 3,
        key: message,
      });
    }
  }
};

export function request(
  url: string = '',
  method: string = 'GET',
  data: object = {},
  isUpload = false,
) {
  const options: any = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    timeout: 2 * 60 * 1000, // 2'
    data: {},
  };
  let token: string | null = null;
  if (isLoggedIn()) {
    token = UserStorage.getToken();
    options.headers.Authorization = `Bearer ${token}`;
  } else {
    history.push('/user/login');
  }

  if (data && isUpload) {
    options.data = data;
    delete options.headers['Content-Type'];
  } else if (data) {
    const body = removeNullProperties(data);
    options.data = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        ...options,
      })
      .then((response) => {
        const { data: successData = {}, status } = response;
        const dataHandle = { ...successData, status, ok: true };
        return resolve(dataHandle);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data: errorData, status } = error.response;
          // const dataHandle = { ...errorData, status };
          // send to bugsnag
          if (status >= 400 && status < 600 && status && status !== 401) {
            // if (bugsnagClient) {
            //   bugsnagClient.notify(new Error(JSON.stringify({ response: dataHandle, url, data })));
            // }
          }
          if (status === 500) {
            // cannot connect to server
            notification.error({
              key: '500_Server_Internal_Error',
              message: 'Máy Chủ Lỗi',
              description: 'Máy chủ lỗi. Vui Lòng thử lại sau',
            });
          }
          if (token) {
            if (status === 401) {
              const { error: { message = '' } = {} } = errorData;
              handleUnAuthorized(message);
            }
            return resolve(errorData);
          }
          return resolve(errorData);
        }
        if (error.request) {
          // send to bugsnag
          // if (bugsnagClient) {
          //   bugsnagClient.notify(new Error(JSON.stringify({ url, status: 408 })));
          // }
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // cannot connect to server
          console.log(error.request);
          notification.error({
            key: '408_Cant_Connect_To_Server',
            message: 'Lỗi Mạng',
            description: 'Không thể kết nối tới máy chủ.',
          });
          return resolve({
            status: 408,
            error: 'ECONNABORTED',
            message: 'Không thể kết nối tới máy chủ.',
          });
        }
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return reject(error);

        // console.log(error.config);
      });
  });
}

function handleUnAuthorized(message: string) {
  if (message === 'No_Permission') {
    notification.error({
      key: 'No_Permission',
      message: 'Không được phép',
      description: 'Tài khoản của bạn không có quyền, vui lòng liên hệ admin!',
    });
  } else {
    notification.error({
      key: 'UnAuthorized',
      message: 'Không được phép',
      description: 'Hết phiên đăng nhập, vui lòng đăng nhập lại!',
    });
    UserStorage.removeUserInfo();
    UserStorage.removeToken();
    UserStorage.removeAccessRights();
    history.push('/user/login');
  }
}
