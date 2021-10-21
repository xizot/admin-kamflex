import React from 'react';
import useStyles from './Loading.styles';
function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.balls}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
