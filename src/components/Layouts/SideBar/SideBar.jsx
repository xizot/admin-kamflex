import React, { useState } from 'react';
import useStyles from './SideBar.styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Close, Delete, ExitToApp } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { uiActions } from '../../../slices/ui.slice';
import { useDispatch } from 'react-redux';

function SideBar() {
  const [dropMenu, setDropMenu] = useState(false);
  const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
  const isControlHide = useSelector((state) => state.ui.isControlHide);
  const classes = useStyles({ isOpenSideBar, isControlHide });
  const dispatch = useDispatch();
  const toggleSideBarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };
  return (
    <div className={classes.root}>
      <IconButton className={classes.close} onClick={toggleSideBarHandler}>
        <Close />
      </IconButton>
      <Typography variant="subtitle1" className={classes.logo}>
        PHIM CHUA
      </Typography>
      <ul>
        <li className={classes.link}>
          <NavLink activeClassName={classes.linkActive} to="/user-manager">
            User manager
          </NavLink>
        </li>

        <li className={classes.link}>
          <Box className={classes.subTitle} onClick={() => setDropMenu((prev) => !prev)}>
            <Typography variant="body2">Movie Manager</Typography>
            <ArrowRight />
          </Box>
          <ul className={`${classes.subContent} ${dropMenu ? 'is-show' : 'is-hide'}`}>
            <li className={classes.link}>
              <NavLink activeClassName={classes.linkActive} to="/movie-manager">
                Movies
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink activeClassName={classes.linkActive} to="/genre-manager">
                Genres
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink activeClassName={classes.linkActive} to="/producer-manager">
                Producers
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
