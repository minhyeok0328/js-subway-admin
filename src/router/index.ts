import { Router } from '../core/Router';
import routes from './routes';

const router = new Router({
  mode: 'hash',
  container: '#content',
  routes,
});

export default router;
