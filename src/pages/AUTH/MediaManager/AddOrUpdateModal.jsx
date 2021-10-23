import {
  TextField,
  Typography,
  FormControl,
  Modal,
  Box,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useStyles from './AddOrUpdateModal.styles';
import { countrySchema, genreSchema } from '../../../schemas/genre.schema';
import { useInput } from '../../../hooks/use-input';
import ButtonLoading from '../../../components/UI/ButtonLoading/ButtonLoading';
import { Close } from '@material-ui/icons';
import { producerAdd, producerUpdate } from '../../../slices/producer.slice';
import { useState } from 'react';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const AddOrUpdateModal = ({
  selectedItem,
  title,
  type,
  isOpen,
  onClose,
  onSuccess,
  buttonLabel,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [releaseDate, setReleaseDate] = useState(new Date('10/20/2021'));
  const {
    enteredInput: producerName,
    inputBlurHandler: producerNameBlurHandler,
    inputChangeHandler: producerNameChangeHandler,
    inputReset: producerNameReset,
    inputIsValid: producerNameIsvalid,
    hasError: producerNameHasError,
    errorMsg: producerNameErrorMessage,
  } = useInput(genreSchema, selectedItem?.name || '');
  const {
    enteredInput: producerCountry,
    inputBlurHandler: producerCountryBlurHandler,
    inputChangeHandler: producerCountryChangeHandler,
    inputReset: producerCountryReset,
    inputIsValid: producerCountryIsvalid,
    hasError: producerCountryHasError,
    errorMsg: producerCountryErrorMessage,
  } = useInput(countrySchema, selectedItem?.country || '');

  const formIsValid = producerCountryIsvalid && producerNameIsvalid;
  const handleDateChange = (date) => {
    // const selectedDate = new Date(date);

    // if (selectedDate.getTime() > maxDate) {
    //   setBirthError('ValidationError: Birth should not be after maximal date');
    //   return;
    // }
    // if (selectedDate.getTime() < minDate) {
    //   setBirthError('ValidationError: Birth should not be before minimal date');
    //   return;
    // }
    setReleaseDate(date);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    if (type === 'UPDATE') {
      try {
        await dispatch(
          producerUpdate({
            id: selectedItem._id,
            name: producerName,
            country: producerCountry,
          })
        ).unwrap();
        toast.success('UPDATE Successfully');
        onClose();
      } catch (error) {
        toast.error(error);
      }
    } else if (type === 'ADD') {
      try {
        await dispatch(
          producerAdd({
            name: producerName,
            country: producerCountry,
          })
        ).unwrap();
        toast.success('ADD Successfully');
        onClose();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const closeHandler = () => {
    onClose();
    producerNameReset();
    producerCountryReset();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <Box>
          <Typography
            variant="h5"
            color="primary"
            style={{ textAlign: 'center' }}
            className={classes.modalTitle}>
            {title}
          </Typography>
          <IconButton onClick={closeHandler} className={classes.close}>
            <Close />
          </IconButton>
        </Box>
        <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Title"
              variant="outlined"
              value={producerName}
              error={producerNameHasError}
              helperText={producerNameHasError && producerNameErrorMessage}
              onBlur={producerNameBlurHandler}
              onChange={producerNameChangeHandler}
              size="small"
            />
          </FormControl>
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Original Title"
              variant="outlined"
              value={producerName}
              error={producerNameHasError}
              helperText={producerNameHasError && producerNameErrorMessage}
              onBlur={producerNameBlurHandler}
              onChange={producerNameChangeHandler}
              size="small"
            />
          </FormControl>
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Original Title"
              variant="outlined"
              value={producerName}
              error={producerNameHasError}
              helperText={producerNameHasError && producerNameErrorMessage}
              onBlur={producerNameBlurHandler}
              onChange={producerNameChangeHandler}
              size="small"
            />
          </FormControl>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <FormControl className={classes.form} fullWidth size="small">
                <TextField
                  label="Run time"
                  type="number"
                  variant="outlined"
                  value={producerName}
                  error={producerNameHasError}
                  helperText={producerNameHasError && producerNameErrorMessage}
                  onBlur={producerNameBlurHandler}
                  onChange={producerNameChangeHandler}
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl variant="outlined" className={classes.form} fullWidth size="small">
                <InputLabel id="select-type">Type</InputLabel>
                <Select
                  labelId="select-type"
                  id="select-type-outlined"
                  // value={age}
                  // onChange={handleChange}
                  defaultValue="movie"
                  label="Type">
                  <MenuItem value="movie">Movie</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Country"
              variant="outlined"
              value={producerCountry}
              error={producerCountryHasError}
              helperText={producerCountryHasError && producerCountryErrorMessage}
              onBlur={producerCountryBlurHandler}
              onChange={producerCountryChangeHandler}
              size="small"
              inputProps={{
                style: { textTransform: 'uppercase' },
              }}
            />
          </FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <FormControl className={classes.form} fullWidth>
              <KeyboardDatePicker
                size="small"
                label="Release Date"
                format="MM/DD/yyyy"
                // minDate={minDate}
                maxDate={new Date()}
                value={releaseDate}
                onChange={handleDateChange}
                error={false}
                helperText={null}
                autoOk
                variant="inline"
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </FormControl>
          </MuiPickersUtilsProvider>
          <ButtonLoading size="large" isLoading={false} type="submit" disabled={!formIsValid}>
            {buttonLabel}
          </ButtonLoading>
        </form>
      </div>
    </Modal>
  );
};
export default AddOrUpdateModal;
