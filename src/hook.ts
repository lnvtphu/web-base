import { useMemo, useReducer } from 'react';
import { Map } from 'immutable';

export type MultiSelectOption = { all: boolean; values: string[] };

type FilterConfig = {
  name: string;
  multi?: boolean;
  filter: (value: string | string[] | MultiSelectOption) => (item: any, index: number) => boolean;
};

const queryParamsReducer = (s: Map<string, string>, a: any) => {
  if (a.key === '__clear') {
    return Map({});
  }
  if (a.key === '__update') {
    return a.value;
  }
  if (a.key === 'q' && a.value !== undefined && a.value.trim() === '') {
    return s.set(a.key, a.value);
  }
  if (a.value === undefined || a.value.length === 0 || (a.value.trim && a.value.trim()) === '') {
    return s.delete(a.key);
  }
  return s.set(a.key, a.value);
};

const isEmpty = (v: string | string[] | undefined) =>
  v === undefined ||
  v === null ||
  v.length === 0 ||
  (typeof v === 'string' && (v.trim() === '' || v.trim() === 'false'));

export const onlyString = (fn: (value: string) => (item: any, idx: number) => boolean) => (
  value: string | string[] | MultiSelectOption,
) => (typeof value !== 'string' ? () => true : fn(value));

export function useFilter(items: any[], options: FilterConfig[]): any {
  const [state, dispatch] = useReducer(queryParamsReducer, Map({}));

  const buildParam = (option: FilterConfig) => {
    // eslint-disable-next-line no-nested-ternary
    let value = state.get(option.name)
      ? state.get(option.name)
      : option.multi
      ? { all: false, values: [] }
      : '';
    if (option.name === 'q' && state.get(option.name) === undefined) {
      value = undefined;
    }
    const update = (newValue: string | { all: boolean; values: string[] }) => {
      dispatch({ key: option.name, value: newValue });
    };
    return { [option.name]: { value, update } };
  };
  const params = Object.assign({}, ...options.map(buildParam));

  const values = options.map((o) => params[o.name].value);

  const filters = options.map((o) => {
    if (
      isEmpty(params[o.name].value) ||
      (typeof params[o.name].value !== 'string' && isEmpty(params[o.name].value.values))
    ) {
      return () => true;
    }
    const { value } = params[o.name];
    return o.filter(value);
  });

  // Filter the data
  const data = useMemo(() => {
    if (!items || items.length === 0) {
      return items;
    }
    return items.filter((item, iidx) => filters.every((i) => (i ? i(item, iidx) : true)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, ...values]);

  const clear = () => {
    dispatch({ key: '__clear' });
  };

  const setQuery = (query: any) => {
    const key = Object.keys(query);
    key.forEach((k: string) => dispatch({ key: k, value: query[k].value }));
  };

  return [data, params, clear, setQuery];
}
