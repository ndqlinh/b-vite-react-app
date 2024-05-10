import { lazy } from 'react';

const Auth = lazy(() => import('./Auth'));
const Signin = lazy(() => import('./Signin'));
const Signup = lazy(() => import('./Signup'));

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
      }
    ]
  }
];

export default router;
