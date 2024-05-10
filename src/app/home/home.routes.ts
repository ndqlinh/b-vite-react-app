import { lazy } from 'react';

const Home = lazy(() => import('./Home'));

const routes = [
  {
    path: '',
    element: Home,
    isProtected: true
  }
];

export default routes;
