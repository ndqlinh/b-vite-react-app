import { lazy } from 'react';

const Principal = lazy(() => import('./Principal'));
const Home = lazy(() => import('./childrens/Home'));
const TodoList = lazy(() => import('./childrens/TodoList'));
const Profile =lazy(() => import('./childrens/Profile'));

const router = [
  {
    path: '',
    element: Principal,
    isProtected: true,
    children: [
      {
        path: '',
        element: Home
      },
      {
        path: 'todo',
        element: TodoList
      },
      {
        path: 'profile',
        element: Profile
      }
    ]
  }
];

export default router;
