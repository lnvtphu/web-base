import { parse, stringify } from 'qs';
import { formatMessage, history, useIntl } from 'umi';
import type { Effect, Reducer } from 'umi';
import { reloadAuthorized } from '@/utils/Authorized';
import { loginServices, logoutServices } from '@/services/auth';
import UserStorage from '@/storage/user.storage';
import GeneralSettingStorage from '@/storage/setting.storage';
import { notification } from 'antd';

export type AuthModelState = {
  currentUser?: any;
};

export type AuthModelType = {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<AuthModelState>;
    updateCurrentUser: Reducer<AuthModelState>;
  };
};

const UserModel: AuthModelType = {
  namespace: 'auth',

  state: {
    currentUser: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginServices.login, payload);
      if (response.ok) {
        const { data: { token = null, accessRoles = [], accessRights = [] } = {}, data } = response;
        UserStorage.setUserInfo(data);
        UserStorage.setToken(token);
        UserStorage.setAccessRoles(accessRoles);
        UserStorage.setAccessRights(accessRights);
        reloadAuthorized();
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        yield put({
          type: 'settingGeneral/getSettingGeneral',
        });
        yield put({
          type: 'spinner/loading',
          payload: false,
        });
        history.replace('/');
      } else {
        const {
          error: { code = '' },
        } = response;
        if (code === 'UNAUTHORIZED') {
          notification.error({
            message: formatMessage({ id: 'common.action.failure' }),
            description: formatMessage({ id: 'login.account.login.error.message' }),
            duration: 3,
            key: `${code}-login-failure`,
          });
        }
      }
    },

    *logout({ payload }, { call, put }) {
      yield put({
        type: 'spinner/loading',
        payload: true,
      });
      yield call(logoutServices.logout, payload);
      yield put({
        type: 'spinner/loading',
        payload: false,
      });
      UserStorage.removeUserInfo();
      UserStorage.removeToken();
      UserStorage.removeAccessRights();
      UserStorage.removeAccessRoles();
      GeneralSettingStorage.resetCodeSetting();
      // redirect
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    updateCurrentUser(state, action) {
      const { currentUser = {} } = state;
      const { fullName, imageUrl } = action;
      return {
        ...state,
        currentUser: { ...currentUser, fullName, imageUrl },
      };
    },
  },
};

export default UserModel;
