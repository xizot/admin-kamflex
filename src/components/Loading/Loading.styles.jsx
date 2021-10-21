import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.main,
  },
  balls: {
    width: '6.5em',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      width: '1em',
      height: '1em',
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
    },
    '& div:nth-of-type(1)': {
      transform: 'translateX(-100%)',
      animation: '$leftSwing 0.5s ease-in alternate infinite',
    },
    '& div:nth-of-type(3)': {
      transform: 'translateX(-95%)',
      animation: '$rightSwing 0.5s ease-out alternate infinite',
    },
  },

  '@keyframes leftSwing': {
    '50%, 100%': {
      transform: ' translateX(95%)',
    },
  },
  '@keyframes rightSwing': {
    '50%': {
      transform: 'translateX(-95%)',
    },
    '100%': {
      transform: ' translateX(100%)',
    },
  },
}));
