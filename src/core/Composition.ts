import Observe from './Observe';
import { _render } from './Render';

type IRef<T = any> = { value: T };

interface IComputed<T = any> {
  fn: () => T;
  initialize: boolean;
  readonly state: IRef;
  watch: unknown;
}

function Composition(callback: () => void) {
  const refContext = {
    state: { value: null } as IRef,
    initialize: false,
  };

  const reactiveContext = {
    state: null as unknown as Record<string, any>,
    initialize: false,
  };

  const computedContext: IComputed = {
    fn: () => '',
    initialize: false,
    state: { value: null },
    watch: null,
  };

  const ref = <T>(initialState: T): T => {
    const { initialize } = refContext;

    if (!initialize) {
      refContext.state = Observe({ value: initialState }, callback);
      refContext.initialize = true;
    }

    return refContext.state as T;
  };

  const reactive = <T extends object>(initialState: T) => {
    const { initialize } = reactiveContext;

    if (!initialize) {
      reactiveContext.state = Observe(initialState, callback);
      reactiveContext.initialize = true;
    }

    return reactiveContext.state;
  };

  const computed = <T>(callbackFn: () => T, watchState?: unknown) => {
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
      computedContext.state.value = fn();
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
