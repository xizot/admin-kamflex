import { Box, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useStyles from './InputFile.styles';
const LIMIT_SIZE = 1024 * 10000;

function InputFile({ onFileSelect, title, maxSize = LIMIT_SIZE, accept, id, disable = false }) {
  const classes = useStyles();
  const inputRef = useRef();
  const [selectedName, setSelectedName] = useState(null);
  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    if (file.size < maxSize) {
      onFileSelect(e.target.files[0]);
      setSelectedName(e.target.files[0]?.name);
    } else {
      toast.error(`Maximum size: ${maxSize / 1024} MB`);
    }
  };
  const removeFileHandler = (e) => {
    onFileSelect(null);
    setSelectedName(null);
    inputRef.current.value = null;
  };

  return (
    <>
      <input
        hidden
        type="file"
        name=""
        id={id}
        accept={accept}
        ref={inputRef}
        disable={disable.toString()}
        onChange={fileInputHandler}
        onClick={(e) => e.target.value === null}
      />
      <Box className={`${classes.inputFile} ${disable ? classes.disable : ''}`}>
        <IconButton className={classes.inputFileIcon}>
          <label htmlFor={id} className={classes.inputFileLabel} />
          <Add />
        </IconButton>

        {!selectedName ? (
          <Typography variant="body1">{title}</Typography>
        ) : (
          <Typography
            variant="body1"
            className={classes.inputSelectedName}
            onClick={removeFileHandler}>
            {`✕ ${selectedName}`}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default InputFile;
