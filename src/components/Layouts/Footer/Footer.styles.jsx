import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
  },
  content: {
    padding: theme.spacing(5, 0, 1, 0),
  },
  options: {},
  optionItem: {
    display: 'block',
    marginBottom: theme.spacing(2),
    '& > a': {
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
    },
  },
  optionItemIcon: {
    marginRight: theme.spacing(0.5),
  },
  copyright: {
    padding: theme.spacing(5, 0),
    color: '#fff',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
}));
