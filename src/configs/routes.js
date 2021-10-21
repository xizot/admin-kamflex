import { lazy } from 'react';
import Logout from '../pages/Logout/Logout';
const Home = lazy(() => import('../pages/AUTH/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const UserManager = lazy(() => import('../pages/AUTH/UserManager/UserManager'));
const MovieManager = lazy(() => import('../pages/AUTH/MovieManager/MovieManager'));
const GenreManager = lazy(() => import('../pages/AUTH/GenreManager/GenreManager'));
const ProducerManager = lazy(() => import('../pages/AUTH/ProducerManager/ProducerManager'));

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
    path: '/logout',
    protected: false,
    exact: true,
    component: Logout,
  },
  {
    path: '/user-manager',
    protected: true,
    exact: true,
    component: UserManager,
  },
  {
    path: '/movie-manager',
    protected: true,
    exact: true,
    component: MovieManager,
  },
  {
    path: '/genre-manager',
    protected: false,
    exact: true,
    component: GenreManager,
  },
  {
    path: '/producer-manager',
    protected: true,
    exact: true,
    component: ProducerManager,
  },
];
