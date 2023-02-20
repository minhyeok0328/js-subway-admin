import Observe from './Observe';
import { _render } from './Render';

interface IMutation {
  [key: string]: (state: object, payload?: unknown) => void;
}

interface IGetters {
  [key: string]: () => unknown;
}

interface IStore<T> {
  state: T;
  mutations: IMutation;
  getters?: IGetters;
}

export function defineStore<T extends object>(store: IStore<T>) {
  const proxyState = Observe(store.state, _render);
  const { mutations } = store;

  const dispatch = (key: string, payload: unknown) => {
    const mutation = mutations[key];
    if (!mutation) {
      throw new Error(`'${key}' mutation 함수를 찾을 수 없습니다.`);
    }

    mutation(proxyState, payload);
  };

  return {
    state: store.state,
    dispatch,
  };
}
