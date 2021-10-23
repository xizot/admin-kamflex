import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  inputFile: {
    padding: theme.spacing(2, 5),
    borderRadius: theme.shape.borderRadius,
    border: '3px dashed #ddd',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputFileIcon: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  inputFileLabel: {
    cursor: 'pointer',

    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  inputSelectedName: {
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    cursor: 'pointer',
  },
}));
