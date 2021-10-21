import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Menu, MenuOpen, ExitToApp, Person } from '@material-ui/icons';
import useStyles from './Header.styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../slices/auth.slice';
import { uiActions } from '../../../slices/ui.slice';
// import InputSearch from '../../InputSearch/InputSearch';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
  const isControlHide = useSelector((state) => state.ui.isControlHide);
  const classes = useStyles({ isOpenSideBar, isControlHide });

  const toggleSideBarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());

    history.push('/login');
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton onClick={toggleSideBarHandler}>
              {isOpenSideBar ? <MenuOpen /> : <Menu />}
            </IconButton>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {/* <Box marginRight={4}>
            <InputSearch />
          </Box> */}
          {!isAuthenticated ? (
            <Link to="/login">
              <Button color="primary" variant="contained">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/account">
                <IconButton className={classes.circleIcon}>
                  <Person />
                </IconButton>
              </Link>
              <Button color="primary" variant="contained" onClick={logoutHandler}>
                Logout <ExitToApp style={{ marginLeft: 5 }} />
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
