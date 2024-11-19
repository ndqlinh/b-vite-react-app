import { lazy } from 'react';

const Auth = lazy(() => import('./Auth'));
const Signin = lazy(() => import('./childrens/Signin'));
const Signup = lazy(() => import('./childrens/Signup'));
const Authorization = lazy(() => import('./childrens/Authorization'));

const router = [
  {
    path: 'auth',
    element: Auth,
    children: [
      {
        path: 'signin',
        element: Signin
      },
      {
        path: 'signup',
        element: Signup
      },
      {
        path: 'authorize',
        element: Authorization
      }
    ]
  }
];

export default router;
