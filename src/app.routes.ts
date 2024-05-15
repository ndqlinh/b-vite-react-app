import authRoutes from './app/auth/auth.routes';
import principalsRoutes from './app/principal/principal.routes';

const appRoutes = [
  ...authRoutes,
  ...principalsRoutes
];

export default appRoutes;
