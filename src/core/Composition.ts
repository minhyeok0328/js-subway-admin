import Observe from './Observe';
import { _render } from './Render';

interface RefContext<T> {
  state: T | null;
  initialize: boolean;
}

interface ComputedContext<T> {
  fn: () => T;
  initialize: boolean;
  state: { value: T };
  watch: unknown;
}

interface CompositionAPI {
  ref<T>(initialState: T): T;

  reactive<T extends Record<string, unknown>>(initialState: T): T;

  computed<T>(callbackFn: () => T, watchState?: unknown): T;
}

function Composition(callback: () => void): CompositionAPI {
  const refContext: RefContext<unknown> = {
    state: null,
    initialize: false,
  };

  const reactiveContext: RefContext<Record<string, unknown>> = {
    state: null,
    initialize: false,
  };

  const computedContext: ComputedContext<unknown> = {
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

  const reactive = <T extends Record<string, unknown>>(initialState: T): T => {
    const { initialize } = reactiveContext;

    if (!initialize) {
      reactiveContext.state = Observe(initialState, callback);
      reactiveContext.initialize = true;
    }

    return reactiveContext.state as T;
  };

  const computed = <T>(callbackFn: () => T, watchState?: unknown): T => {
    const { initialize, fn, watch } = computedContext;

    if (!initialize) {
      computedContext.state = Observe({ value: callbackFn() }, callback);
      computedContext.fn = callbackFn;
      computedContext.watch = watchState;
      computedContext.initialize = true;

      return computedContext.state as T;
    }

    if (JSON.stringify(watch) !== JSON.stringify(watchState)) {
      computedContext.watch = watchState;
      computedContext.state!.value = fn();
    }

    return computedContext.state as T;
  };

  return {
    ref,
    reactive,
    computed,
  };
}

export const { ref, reactive, computed } = Composition(_render);
