import { lazy } from 'react';

const Principal = lazy(() => import('./Principal'));
const Home = lazy(() => import('./childrens/Home'));
const TodoList = lazy(() => import('./childrens/TodoList'));

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
      }
    ]
  }
];

export default router;
