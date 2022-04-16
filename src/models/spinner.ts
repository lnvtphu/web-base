import type { SpinnerModelType } from '@/interface/spinner';

const SpinnerModel: SpinnerModelType = {
  namespace: 'spinner',
  state: {
    spinning: false,
    spinover: false,
  },

  effects: {
    *loading({ payload, spinover }, { put }) {
      yield put({
        type: 'spinnerReducer',
        payload,
        spinover,
      });
    },
  },

  reducers: {
    spinnerReducer(state, { payload, spinover }) {
      const spinning = typeof spinover === 'boolean' ? spinover : state?.spinover || payload;
      return {
        ...state,
        spinning,
        spinover,
      };
    },
  },
};

export default SpinnerModel;
