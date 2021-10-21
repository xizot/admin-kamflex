import { Suspense, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import SideBar from './components/Layouts/SideBar/SideBar';
import { Box, createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import aos from 'aos';
import 'aos/dist/aos.css';
import Loading from './components/Loading/Loading';
import { routes } from './configs/routes';
import ProtectedRoute from './components/Commons/ProtectedRoute/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './slices/auth.slice';
import Header from './components/Layouts/Header/Header';
import { uiActions } from './slices/ui.slice';
const theme = createTheme({
  palette: {
    primary: {
      main: '#E30812',
      contrastText: '#fff',
    },
    secondary: {
      main: '#131722',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  content: {
    transition: 'all .5s',
    paddingLeft: (props) => (props.isControlHide ? 0 : props.isOpenSideBar ? 250 : 0),
  },
}));

function App() {
  const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
  const isControlHide = useSelector((state) => state.ui.isControlHide);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const classes = useStyles({ isOpenSideBar, isControlHide });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    aos.init({
      offset: 120,
    });
    aos.refresh();

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(
        authActions.verifiedAuth({
          accessToken,
          refreshToken,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !user.granted?.includes(1)) {
      toast.error('Only admin account can login');
      return history.push('/logout');
    }
    if (isAuthenticated && user.granted?.includes(1)) {
      toast.dismiss();
    }
  }, [user, history, isAuthenticated]);
  useEffect(() => {
    if (isControlHide && !location.pathname.includes('/login'))
      dispatch(uiActions.controlHandler(false));
  }, [dispatch, location.pathname, isControlHide]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Header />
      <SideBar />
      <Box className={classes.content}>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => {
                    if (route.protected) {
                      return (
                        <ProtectedRoute {...props} currentPath={route.path}>
                          <route.component />
                        </ProtectedRoute>
                      );
                    }
                    return <route.component {...route.props} />;
                  }}
                />
              );
            })}
            <Route path="*">404 NOT FOUND</Route>
          </Switch>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App;
