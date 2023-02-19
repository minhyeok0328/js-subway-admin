import { debounce } from '../utils';

interface IConfig {
  container: Element | null;
  rootComponent: () => string;
}

function Render() {
  const config: IConfig = {
    container: null,
    rootComponent: () => '',
  };

  const _render = debounce(() => {
    const { container, rootComponent } = config;
    container!.innerHTML = rootComponent();
  });

  const render = (rootComponent: IConfig['rootComponent']) => {
    config.container!.innerHTML = rootComponent();
    config.rootComponent = rootComponent;
  };

  const createRoot = (container: IConfig['container']) => {
    if (!container) {
      throw new Error('container 를 찾을 수 없습니다.');
    }

    config.container = container;
    return { render };
  };

  return {
    createRoot,
    _render,
  };
}

export const { createRoot, _render } = Render();
