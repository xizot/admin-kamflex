import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: (props) => (props.isControlHide ? 'none' : 'block'),
    width: 250,
    overflow: 'hidden auto',
    height: '100vh',
    background: theme.palette.secondary.main,
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 9999,
    padding: theme.spacing(5, 2),
    color: '#fff',
    transform: (props) => (props.isOpenSideBar ? 'translateX(0)' : 'translateX(-100%)'),
    transition: 'all .5s',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
  },
  logo: {
    marginBottom: theme.spacing(3),
  },
  content: {},
  link: {
    '& >a ': { opacity: 0.8 },
    '& >a.active': { opacity: 1 },
    display: 'block',
    margin: theme.spacing(2, 0),
  },
  linkAcitve: {
    opacity: 1 + '!important',
  },
  subTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    opacity: 0.8,
    cursor: 'pointer',
  },
  subContent: {
    marginLeft: theme.spacing(2),
    '&.is-hide': {
      display: 'none',
    },
    '&.is-show': {
      display: 'block',
    },
  },
  close: {
    position: 'absolute',
    top: theme.spacing(5),
    right: theme.spacing(2),
    transform: `translateY(-${theme.spacing(1)}px)`,
    color: '#fff',
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
