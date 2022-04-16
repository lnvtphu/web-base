import type { Effect, Reducer } from 'umi';

export interface SpinnerModelType {
  namespace: string;
  state: SpinnerState;
  effects: {
    loading: Effect;
  };
  reducers: {
    spinnerReducer: Reducer<SpinnerState>;
  };
}
export interface SpinnerState {
  spinning: boolean;
  spinover: boolean;
}
