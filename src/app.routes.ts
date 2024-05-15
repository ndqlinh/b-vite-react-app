import authRoutes from './app/auth/auth.routes';
import principalsRoutes from './app/principal/pricipal.routes';

const appRoutes = [
  ...authRoutes,
  ...principalsRoutes
];

export default appRoutes;
