import { IRoutes } from '../domain/types';

interface IRouter {
  container: string;
  routes: IRoutes[];
}

export class Router {
  private container: Element | undefined;

  private readonly routes: IRoutes[];

  constructor({ container, routes }: IRouter) {
    this.routes = routes;

    window.onload = () => {
      this.container = document.querySelector(container)!;
      this.setup();
    };
  }

  findRoute(path: string) {
    return this.routes.find((route) => route.path === path);
  }

  setup() {
    window.addEventListener('popstate', () => {
      this.routing();
    });

    this.routing();
  }

  routing() {
    let path: string = window.location.hash.replace('#', '');
    if (!path.length) path = '/';

    const selectPath = this.findRoute(path);

    if (!selectPath) {
      throw new Error(`"${path}" 경로에 해당하는 router 를 찾을 수 없습니다.`);
    }
    this.container!.innerHTML = selectPath?.component();
  }
}
