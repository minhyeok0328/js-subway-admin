import { IRoutes } from '../domain/types';

interface IProps {
  container: string;
  routes: IRoutes[];
  mode: 'hash' | 'history';
}

export class Router {
  private container: Element | undefined;

  private readonly routes: IRoutes[];

  private readonly mode: string;

  constructor({ container, routes, mode }: IProps) {
    this.routes = routes;
    this.mode = mode;

    window.onload = () => {
      this.container = document.querySelector(container)!;
      this.setup();
    };
  }

  get isHashMode(): boolean {
    return this.mode === 'hash';
  }

  get getPathFromUrl() {
    return this.isHashMode
      ? window.location.hash.replace('#', '')
      : window.location.pathname;
  }

  push(path: string) {
    if (this.isHashMode) {
      window.location.hash = path;
    } else {
      window.history.pushState(null, '', path);
      this.routing();
    }
  }

  findRoute(path: string) {
    return this.routes.find((route) => route.path === path);
  }

  setup() {
    window.addEventListener('popstate', () => {
      this.routing();
    });

    if (!this.isHashMode) {
      const oldPushState = window.history.pushState;

      window.history.pushState = (path) => {
        oldPushState.apply(window.history, [null, '', path]);
        window.dispatchEvent(new PopStateEvent('popstate'));
      };
    }

    this.routing();
  }

  routing() {
    let path: string = this.getPathFromUrl;
    if (!path.length) path = '/';

    const selectPath = this.findRoute(path);

    if (!selectPath) {
      throw new Error(`"${path}" 경로에 해당하는 router 를 찾을 수 없습니다.`);
    }
    this.container!.innerHTML = selectPath?.component();
  }
}
