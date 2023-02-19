import Observe from '../domain/Observe';
import { _render } from './Render';

interface IContext<T> {
  state: T;
  initialize: boolean;
  fn?: () => T;
  watch?: any[];
}

interface IComposition<T> {
  ref: (initialState: T) => T;
  reactive: (initialState: T[]) => T;
  computed: (callbackFn: () => T, watchState: any[]) => T;
}

const refContext: IContext<any> = {
  state: null,
  initialize: false,
};

const reactiveContext: IContext<any> = {
  state: null,
  initialize: false,
};

const computedContext: IContext<any> = {
  state: null,
  fn: () => '',
  watch: [],
  initialize: false,
};

function Composition<T>(callback: () => void): IComposition<T> {
  const ref = (initialState: T) => {
    const { initialize } = refContext;

    if (!initialize) {
      refContext.state = Observe({ value: initialState }, callback);
      refContext.initialize = true;
    }

    return refContext.state;
  };

  const reactive = (initialState: object | []) => {
    const { initialize } = reactiveContext;

    if (!initialize) {
      reactiveContext.state = Observe(initialState, callback);
      reactiveContext.initialize = true;
    }

    return reactiveContext.state;
  };

  const computed = (callbackFn: () => T, watchState: any[]) => {
    const { initialize, fn, watch } = computedContext;

    if (!initialize) {
      computedContext.state = Observe({ value: callbackFn() }, callback);
      computedContext.fn = callbackFn;
      computedContext.watch = watchState;
      computedContext.initialize = true;

      return computedContext.state;
    }

    if (JSON.stringify(watch) !== JSON.stringify(watchState)) {
      computedContext.watch = watchState;
      computedContext.state.value = fn?.();
    }

    return computedContext.state;
  };

  return {
    ref,
    reactive,
    computed,
  };
}

export const { ref, reactive, computed } = Composition(_render);
