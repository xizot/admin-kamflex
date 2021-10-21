import { lazy } from 'react';
const Home = lazy(() => import('../pages/AUTH/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const UserManager = lazy(() => import('../pages/AUTH/UserManager/UserManager'));
const MovieManager = lazy(() => import('../pages/AUTH/MovieManager/MovieManager'));

export const routes = [
  {
    path: '/',
    protected: true,
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: Login,
  },
  {
    path: '/user-manager',
    protected: false,
    exact: true,
    component: UserManager,
  },
  {
    path: '/movie-manager',
    protected: false,
    exact: true,
    component: MovieManager,
  },
];
