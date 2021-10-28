import { TextField, Typography, FormControl, Modal, Box, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useStyles from './AddOrUpdateModal.styles';
import { countrySchema, genreSchema } from '../../../schemas/genre.schema';
import { useInput } from '../../../hooks/use-input';
import ButtonLoading from '../../../components/UI/ButtonLoading/ButtonLoading';
import { Close } from '@material-ui/icons';
import { producerAdd, producerUpdate } from '../../../slices/producer.slice';

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
              label="Producer name"
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
          <ButtonLoading size="large" isLoading={false} type="submit" disabled={!formIsValid}>
            {buttonLabel}
          </ButtonLoading>
        </form>
      </div>
    </Modal>
  );
};
export default AddOrUpdateModal;
