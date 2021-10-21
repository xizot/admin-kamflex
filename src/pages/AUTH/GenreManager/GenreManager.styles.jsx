import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: '20vh',
  },
  actionIcon: {
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'all .5s',
    '&:hover': {
      opacity: 0.7,
    },
  },
}));
