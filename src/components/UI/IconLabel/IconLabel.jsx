import { IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    border: (props) => (props?.color ? `1px solid ${props?.color}` : `1px solid #fff`),
    position: 'relative',
    width: 40,
    height: 40,
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      height: 35,
      width: 35,
    },
    '&:hover $label': {
      display: 'block',
    },
  },
  label: {
    display: 'none',
    position: 'absolute',
    top: 0,
    minWidth: 'max-content',
    left: '50%',
    transform: 'translate(-50%, calc(-100% - 12px))',
    background: 'white',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.2, 1),
    color: '#000',
    border: '1px solid #cecece',
    '&:before': {
      content: "''",
      position: 'absolute',
      bottom: 1,
      left: '50%',
      display: 'block',
      transform: 'translate(-50%,100%)',
      borderWidth: 6,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      zIndex: 2,
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: '50%',
      display: 'block',
      transform: 'translate(-50%,100%)',
      borderWidth: 7,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopColor: '#cecece',
      zIndex: 1,
    },
  },
  icon: {
    color: (props) => (props?.color ? props?.color : '#fff'),
    [theme.breakpoints.down('md')]: {
      height: 20,
      width: 20,
    },
  },
}));

function IconLabel({ Icon, label, onClick, size, color, classes, ...props }) {
  const styles = useStyles({ color });

  return (
    <div className={classes?.root}>
      <IconButton className={styles.root} onClick={onClick} size={size} {...props}>
        <Typography variant="caption" className={styles.label}>
          {label}
        </Typography>
        <Icon className={styles.icon} />
      </IconButton>
    </div>
  );
}

export default IconLabel;
