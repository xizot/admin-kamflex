import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    '&.Mui-disabled': {
      background: '#ddd',
      cursort: 'not-allowed',
    },
  },
  buttonLoading: {
    opacity: ' 0.7 !important',
    minHeight: 42,
  },
}));

function ButtonLoading({ children, size, onClick, isLoading, ...props }) {
  const classes = useStyles();
  return (
    <>
      {isLoading && (
        <Button
          className={`${classes.root} ${classes.buttonLoading}`}
          fullWidth
          size={size}
          variant="contained"
          color="primary"
          startIcon={<CircularProgress size={22} style={{ color: '#fff' }} />}
        />
      )}
      {!isLoading && (
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          fullWidth
          size={size}
          onClick={onClick}
          {...props}>
          {children}
        </Button>
      )}
    </>
  );
}

export default ButtonLoading;
