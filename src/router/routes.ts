import {
  Lines, Login, MainPage, Sections, Signup, Stations,
} from '../pages';
import { IRoutes } from '../domain/types';

const routes: IRoutes[] = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/lines',
    component: Lines,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/sections',
    component: Sections,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/stations',
    component: Stations,
  },
];

export default routes;
