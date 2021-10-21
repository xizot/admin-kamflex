import { TextField, Typography, FormControl, Modal, Box, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useStyles from './AddOrUpdateModal.styles';
import { genreSchema } from '../../../schemas/genre.schema';
import { useInput } from '../../../hooks/use-input';
import ButtonLoading from '../../../components/UI/ButtonLoading/ButtonLoading';
import { Close } from '@material-ui/icons';
import { genreAdd, genreUpdate } from '../../../slices/genre.slice';

const AddOrUpdateModal = ({ selectedItem, title, type, isOpen, onClose, buttonLabel }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    enteredInput: genreName,
    inputBlurHandler: genreNameBlurHandler,
    inputChangeHandler: genreNameChangeHandler,
    inputReset: genreNameReset,
    inputIsValid: genreNameIsvalid,
    hasError: genreNameHasError,
    errorMsg: genreNameErrorMessage,
  } = useInput(genreSchema, selectedItem?.name || '');

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!genreNameIsvalid) return;

    if (type === 'UPDATE') {
      try {
        await dispatch(
          genreUpdate({
            id: selectedItem._id,
            name: genreName,
            language: 'en',
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
          genreAdd({
            name: genreName,
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
    genreNameReset();
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
              label="Genre name"
              variant="outlined"
              value={genreName}
              error={genreNameHasError}
              helperText={genreNameHasError && genreNameErrorMessage}
              onBlur={genreNameBlurHandler}
              onChange={genreNameChangeHandler}
              size="small"
            />
          </FormControl>
          <ButtonLoading size="large" isLoading={false} type="submit" disabled={!genreNameIsvalid}>
            {buttonLabel}
          </ButtonLoading>
        </form>
      </div>
    </Modal>
  );
};
export default AddOrUpdateModal;
