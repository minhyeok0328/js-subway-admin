import { Router } from '../core/Router';
import routes from './routes';

const router = new Router({
  container: '#content',
  routes,
});

export default router;
