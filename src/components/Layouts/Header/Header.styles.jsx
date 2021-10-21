import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    transition: 'all .5s',
    display: (props) => (props.isControlHide ? 'none' : 'block'),
    paddingLeft: (props) => (props.isOpenSideBar ? 250 : 0),
    background: '#fff',
  },
  logo: {
    marginRight: theme.spacing(5),
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLink: {
    display: 'block',
    opacity: 0.7,
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  navLinkActive: {
    opacity: 1,
  },
  spSection: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  spSectionContent: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 9999,
    background: theme.palette.secondary.main,
    padding: theme.spacing(15, 2),
    transition: 'all .5s',
    marginLeft: '-100%',
  },
  openSPMenu: {
    marginLeft: 0,
  },

  spNavigation: {
    '& $navLink': {
      textAlign: 'center',
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  desktopSection: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  iconClose: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
  },
  circleIcon: {
    color: '#fff',
    marginRight: theme.spacing(1),
  },
}));
