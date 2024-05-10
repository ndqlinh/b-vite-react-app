import authRoutes from './app/auth/auth.routes';
import homeRoutes from './app/home/home.routes';

const appRoutes = [
  ...authRoutes,
  ...homeRoutes
];

export default appRoutes;
