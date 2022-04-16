import type { Effect, Reducer } from 'umi';
import { userServices } from '@/services/user';
import { showNotification } from '@/utils/authority';
import UserStorage from '@/storage/user.storage';

export type UserModelState = {
  stageManagers?: [];
  stageCurators?: [];
  currentUser?: {};
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getStageManagers: Effect;
    getStageCurator: Effect;
    getCurrentUser: Effect;
    updateCurrentUser: Effect;
  };
  reducers: {
    saveStageManager: Reducer<UserModelState>;
    saveStageCurator: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    stageManagers: [],
    stageCurators: [],
    currentUser: {},
  },

  effects: {
    *getStageManagers(_, { call, put }) {
      yield put({
        type: 'spinner/loading',
        payload: true,
      });
      const response = yield call(userServices.getStageManagers);
      yield put({
        type: 'spinner/loading',
        payload: false,
      });
      const { ok, items = [] } = response;
      if (ok) {
        yield put({
          type: 'saveStageManager',
          payload: items,
        });
      } else {
        showNotification(response);
      }
    },
    *getStageCurator(_, { call, put }) {
      yield put({
        type: 'spinner/loading',
        payload: true,
      });
      const response = yield call(userServices.getStageCurator);
      yield put({
        type: 'spinner/loading',
        payload: false,
      });
      const { ok, items = [] } = response;
      if (ok) {
        yield put({
          type: 'saveStageCurator',
          payload: items,
        });
      } else {
        showNotification(response);
      }
    },
    *getCurrentUser(_, { call, put }) {
      yield put({
        type: 'spinner/loading',
        payload: true,
      });
      const response = yield call(userServices.getCurrentUser);
      yield put({
        type: 'spinner/loading',
        payload: false,
      });
      const { data } = response;
      if (data?.id) {
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      } else {
        showNotification(response);
      }
    },
    *updateCurrentUser({ payload }, { call, put }) {
      yield put({
        type: 'spinner/loading',
        payload: true,
      });
      const response = yield call(userServices.updateCurrentUser, payload);
      yield put({
        type: 'spinner/loading',
        payload: false,
      });
      showNotification(response);
      const { data: { id = '', fullName = '', imageUrl = '' } = {} } = response;
      if (id) {
        const currentUserLocal = UserStorage.getUserInfo() || {};
        const currentUserNew = { ...currentUserLocal, fullName, imageUrl };
        UserStorage.setUserInfo(currentUserNew);
        yield put({
          type: 'auth/updateCurrentUser',
          fullName,
          imageUrl,
        });
      }
    },
  },

  reducers: {
    saveStageManager(state, action) {
      return {
        ...state,
        stageManagers: action.payload || {},
      };
    },
    saveStageCurator(state, action) {
      return {
        ...state,
        stageCurators: action.payload || {},
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
