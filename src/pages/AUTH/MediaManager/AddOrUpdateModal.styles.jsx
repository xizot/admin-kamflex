import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    width: '60rem',
    maxWidth: '90%',
    margin: '20vh auto 5vh',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4, 3),
    position: 'relative',
  },
  form: {
    marginTop: '9px',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginTop: theme.spacing(1),
  },
  search: {
    marginTop: theme.spacing(1),
  },
  importImg: {
    color: '#fff',
    position: 'absolute',
    right: '0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    width: '113px',
    height: '27px',
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  save: {
    color: '#fff',
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
  },
  autoComplete: {
    marginTop: theme.spacing(2),
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 99,
  },
  updateImage: {
    paddingTop: '56.25%',
    position: 'relative',
    width: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFix: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
  },
}));
