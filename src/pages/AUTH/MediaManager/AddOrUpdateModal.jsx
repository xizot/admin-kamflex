import { useCallback, useEffect, useState } from 'react';
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
  FormHelperText,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useStyles from './AddOrUpdateModal.styles';
import { useInput } from '../../../hooks/use-input';
import ButtonLoading from '../../../components/UI/ButtonLoading/ButtonLoading';
import InputFile from '../../../components/InputFile/InputFile';
import { Close } from '@material-ui/icons';
import { producerGetAll } from '../../../slices/producer.slice';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Autocomplete } from '@material-ui/lab';
import { mediaSchema } from '../../../schemas/media.schema';
import FormData from 'form-data';

import {
  mediaAdd,
  mediaAddSource,
  mediaAddSourceSession,
  mediaAddSourceWithURL,
  mediaAddSubtitle,
  mediaAddTrailer,
  mediaGetById,
  mediaUpdate,
  mediaUpdateBackdrop,
  mediaUpdatePoster,
} from '../../../slices/media.slice';
import moment from 'moment';
import { genreGetAll } from '../../../slices/genre.slice';

const AddOrUpdateModal = ({ selectedItem, modalTitle, type, isOpen, onClose, buttonLabel }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [releaseDate, setReleaseDate] = useState(new Date('10/20/2021'));
  const [selectedGenres, setSelectedGenres] = useState(selectedItem?.genres || []);
  const [isTouchedGenres, setIsTouchGenres] = useState(false);
  const [isTouchedProducer, setIsTouchedProducer] = useState(false);
  const [selectedProducers, setSelectedProducers] = useState(selectedItem?.genres || []);
  const listGenre = useSelector((state) => state.genre.results);
  const listProducer = useSelector((state) => state.producer.results);
  const [selectedType, setSelectedType] = useState('movie');
  const [addedId, setAddedId] = useState(null);
  const [addSourceLoading, setAddSourceLoading] = useState(false);
  const [sourceAdded, setSourceAdded] = useState({
    trailer: false,
    poster: false,
    backdrop: false,
    subtitle: false,
    source: false,
    googleDrive: false,
    session: false,
  });

  const listType = [
    {
      value: 'movie',
      name: 'Movie',
    },
  ];
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [selectedBackdrop, setSelectedBackdrop] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);

  const {
    enteredInput: title,
    inputBlurHandler: titleBlurHandler,
    inputChangeHandler: titleChangeHandler,
    inputReset: titleReset,
    inputIsValid: titleIsvalid,
    hasError: titleHasError,
    errorMsg: titleErrorMessage,
    setEnteredInput: setTitle,
  } = useInput(mediaSchema.title);

  const {
    enteredInput: overview,
    inputBlurHandler: overviewBlurHandler,
    inputChangeHandler: overviewChangeHandler,
    inputReset: overviewReset,
    inputIsValid: overviewIsvalid,
    hasError: overviewHasError,
    errorMsg: overviewErrorMessage,
    setEnteredInput: setOverview,
  } = useInput(mediaSchema.overview);

  const {
    enteredInput: runtime,
    inputBlurHandler: runtimeBlurHandler,
    inputChangeHandler: runtimeChangeHandler,
    inputReset: runtimeReset,
    inputIsValid: runtimeIsvalid,
    hasError: runtimeHasError,
    errorMsg: runtimeErrorMessage,
    setEnteredInput: setRuntime,
  } = useInput(mediaSchema.runtime);
  const {
    enteredInput: trailer,
    inputBlurHandler: trailerBlurHandler,
    inputChangeHandler: trailerChangeHandler,
    inputReset: trailerReset,
    inputIsValid: trailerIsvalid,
    hasError: trailerHasError,
    errorMsg: trailerErrorMessage,
  } = useInput(mediaSchema.trailer);

  const formIsValid =
    titleIsvalid &&
    overviewIsvalid &&
    runtimeIsvalid &&
    selectedGenres?.length > 0 &&
    selectedProducers?.length > 0;
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

  const getGenreHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(
          genreGetAll({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
        console.log('🚀 ~ file: getGenreHandler.jsx ~ line 274 ~ getGenreHandler ~ error', error);
      }
    },
    [dispatch]
  );

  const getProducerHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(
          producerGetAll({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
        console.log(
          '🚀 ~ file: getProducerHandler.jsx ~ line 274 ~ getProducerHandler ~ error',
          error
        );
      }
    },
    [dispatch]
  );
  const getMediaByIdHandler = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          mediaGetById({
            id,
          })
        ).unwrap();

        setTitle(response?.title || '');
        setRuntime(response?.runtime || '');
        setOverview(response?.overview || '');
        setSelectedType(response?.type || '');
        setReleaseDate((response?.releaseDate && new Date(response?.releaseDate)) || new Date());
        setSelectedGenres(response?.genres || []);
        setSelectedProducers(response?.producers || []);
      } catch (error) {
        toast.error(error);
        console.log(
          '🚀 ~ file: getMediaByIdHandler.jsx ~ line 158 ~ getProducerHandler ~ error',
          error
        );
      }
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const sourceSelectHandler = (file) => {
    if (!file) {
      setSelectedSource(null);
      return;
    } else {
      setSelectedSource(file);
    }
  };
  const posterSelectHandler = async (file) => {
    if (!file) {
      setSelectedPoster(null);
      return;
    }
    setSelectedPoster(file);
  };
  const backdropSelectHandler = async (file) => {
    if (!file) {
      setSelectedBackdrop(null);
      return;
    }
    setSelectedBackdrop(file);
  };
  const subtitleSelectHandler = async (file) => {
    if (!file) {
      setSelectedSubtitle(null);
      return;
    }
    setSelectedSubtitle(file);
  };
  const closeHandler = () => {
    if (!addSourceLoading) {
      onClose();
      titleReset();
      runtimeReset();
      overviewReset();
      trailerReset();
      setSelectedGenres([]);
      setSelectedProducers([]);
      setReleaseDate(new Date());
      setSelectedType('movie');
      setIsTouchGenres(false);
      setIsTouchedProducer(false);
      setSelectedBackdrop(null);
      setSelectedPoster(null);
      setSelectedSubtitle(null);
      setSelectedSource(null);
      setAddSourceLoading(false);
      setAddedId(null);
      setSourceAdded({
        trailer: false,
        poster: false,
        backdrop: false,
        subtitle: false,
        source: false,
        googleDrive: false,
        session: false,
      });
    } else {
      toast.error('Please waiting...');
    }
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    if (type === 'UPDATE') {
      try {
        await dispatch(
          mediaUpdate({
            id: selectedItem._id,
            title,
            originalTitle: title,
            overview,
            genres: selectedGenres?.map((item) => item?._id),
            originalLanguage: 'en',
            producers: selectedProducers?.map((item) => item?._id),
            runtime,
            adult: false,
            releaseDate: moment(releaseDate).format('yyyy-MM-DD'),
          })
        ).unwrap();
        toast.success('Update Successfully');
        closeHandler();
      } catch (error) {
        toast.error(error);
      }
    } else if (type === 'ADD') {
      try {
        const response = await dispatch(
          mediaAdd({
            type: selectedType,
            title,
            originalTitle: title,
            overview,
            genres: selectedGenres?.map((item) => item?._id),
            originalLanguage: 'en',
            producers: selectedProducers?.map((item) => item?._id),
            runtime,
            adult: false,
            releaseDate: moment(releaseDate).format('yyyy-MM-DD'),
          })
        ).unwrap();
        toast.success('Add Media Successfully');
        setAddedId(response._id);
        // onClose();
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const addSourceIsValid =
    (selectedBackdrop !== null ||
      selectedPoster !== null ||
      selectedSubtitle !== null ||
      trailerIsvalid ||
      selectedSource !== null) &&
    selectedSource !== null;

  const addSourceHandler = async () => {
    try {
      if (!addSourceIsValid) {
        return;
      }

      setAddSourceLoading(true);

      if (!sourceAdded.trailer && trailerIsvalid) {
        await dispatch(
          mediaAddTrailer({
            id: addedId,
            url: trailer,
          })
        ).unwrap();
        setSourceAdded((prev) => ({ ...prev, trailer: true }));
      }

      if (!sourceAdded.poster && selectedPoster) {
        const form = new FormData();
        form.append('file', selectedPoster);
        await dispatch(
          mediaUpdatePoster({
            id: addedId,
            file: form,
          })
        ).unwrap();
        setSourceAdded((prev) => ({ ...prev, poster: true }));
      }

      if (!sourceAdded.backdrop && selectedBackdrop) {
        const form = new FormData();
        form.append('file', selectedBackdrop);
        await dispatch(
          mediaUpdateBackdrop({
            id: addedId,
            file: form,
          })
        ).unwrap();
        setSourceAdded((prev) => ({ ...prev, backdrop: true }));
      }

      if (!sourceAdded.subtitle && selectedSubtitle) {
        const form = new FormData();
        form.append('file', selectedSubtitle);
        form.append('language', 'en');
        await dispatch(
          mediaAddSubtitle({
            id: addedId,
            file: form,
          })
        ).unwrap();
        setSourceAdded((prev) => ({ ...prev, subtitle: true }));
      }

      if (selectedSource) {
        const { _id: sessionId, url } = await dispatch(
          mediaAddSource({
            id: addedId,
            filename: selectedSource.name,
            mimeType: selectedSource.type,
            size: selectedSource.size,
          })
        ).unwrap();

        setSourceAdded((prev) => ({ ...prev, source: true }));

        const res = await dispatch(
          mediaAddSourceWithURL({
            file: selectedSource,
            url,
          })
        ).unwrap();

        if (res) {
          await dispatch(
            mediaAddSourceSession({
              id: addedId,
              sessionId: sessionId,
              fileId: res.id,
            })
          ).unwrap();
        }
      }

      setAddSourceLoading(false);
      closeHandler();
      toast.success('ADD successfully');
    } catch (error) {
      toast.error(error);
      setAddSourceLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    getProducerHandler(1, 50);
    getGenreHandler(1, 50);
  }, [getProducerHandler, getGenreHandler]);

  useEffect(() => {
    if (selectedItem != null && type === 'UPDATE') getMediaByIdHandler(selectedItem._id);
  }, [selectedItem, type, getMediaByIdHandler]);

  return (
    <Modal
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ overflow: 'auto' }}>
      <div className={classes.paper}>
        <Box>
          <Typography
            variant="h5"
            color="primary"
            style={{ textAlign: 'center' }}
            className={classes.modalTitle}>
            {modalTitle}
          </Typography>
          <IconButton onClick={closeHandler} className={classes.close}>
            <Close />
          </IconButton>
        </Box>
        {!addedId && (
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            <FormControl className={classes.form} fullWidth size="small">
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                error={titleHasError}
                helperText={titleHasError && titleErrorMessage}
                onBlur={titleBlurHandler}
                onChange={titleChangeHandler}
                size="small"
              />
            </FormControl>

            <FormControl className={classes.form} fullWidth size="small">
              <Autocomplete
                size="small"
                multiple
                id="tags-outlined"
                options={listGenre}
                getOptionLabel={(option) => option.name}
                value={selectedGenres}
                onChange={(event, newValue) => {
                  setSelectedGenres(newValue);
                  setIsTouchGenres(true);
                }}
                onBlur={() => setIsTouchGenres(true)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Genres" placeholder="Type" />
                )}
              />
              {isTouchedGenres && selectedGenres?.length <= 0 && (
                <FormHelperText variant="outlined" error className={classes.errorMessage}>
                  Please select genre
                </FormHelperText>
              )}
            </FormControl>
            <FormControl className={classes.form} fullWidth size="small">
              <Autocomplete
                size="small"
                multiple
                id="tags-outlined"
                options={listProducer}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={selectedProducers}
                onChange={(event, newValue) => {
                  setSelectedProducers(newValue);
                  setIsTouchedProducer(true);
                }}
                onBlur={() => setIsTouchedProducer(true)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Producers" placeholder="Name" />
                )}
              />
              {isTouchedProducer && selectedProducers?.length <= 0 && (
                <FormHelperText variant="outlined" error className={classes.errorMessage}>
                  Please select producer
                </FormHelperText>
              )}
            </FormControl>

            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <FormControl variant="outlined" className={classes.form} fullWidth size="small">
                  <InputLabel id="select-type">Type</InputLabel>
                  <Select
                    labelId="select-type"
                    id="select-type-outlined"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    defaultValue="movie"
                    label="Type">
                    {listType?.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={4}>
                <FormControl className={classes.form} fullWidth size="small">
                  <TextField
                    label="Runtime"
                    variant="outlined"
                    value={runtime}
                    error={runtimeHasError}
                    helperText={runtimeHasError && runtimeErrorMessage}
                    onBlur={runtimeBlurHandler}
                    onChange={runtimeChangeHandler}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </FormControl>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

            <FormControl className={classes.form} fullWidth size="small">
              <TextField
                label="Overview"
                variant="outlined"
                multiline
                rows={5}
                value={overview}
                error={overviewHasError}
                helperText={overviewHasError && overviewErrorMessage}
                onBlur={overviewBlurHandler}
                onChange={overviewChangeHandler}
                size="small"
              />
            </FormControl>

            <ButtonLoading size="large" isLoading={false} type="submit" disabled={!formIsValid}>
              {buttonLabel}
            </ButtonLoading>
          </form>
        )}

        {type === 'ADD' && addedId && (
          <form encType="multipart/form-data">
            <Box>
              <FormControl className={classes.form} fullWidth size="small">
                <TextField
                  label="Trailer"
                  variant="outlined"
                  value={trailer}
                  error={trailerHasError}
                  helperText={trailerHasError && trailerErrorMessage}
                  onBlur={trailerBlurHandler}
                  onChange={trailerChangeHandler}
                  placeholder="Youtube URI"
                  size="small"
                  InputProps={{
                    readOnly: sourceAdded.trailer,
                  }}
                  disabled={sourceAdded.trailer}
                />
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <InputFile
                    title="Add Poster"
                    accept="image/png, image/gif, image/jpeg"
                    id="poster"
                    onFileSelect={posterSelectHandler}
                    maxSize={2097152}
                    disable={sourceAdded.poster}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputFile
                    title="Add Backdrop"
                    accept="image/png, image/gif, image/jpeg"
                    id="backdrop"
                    onFileSelect={backdropSelectHandler}
                    maxSize={4194304}
                    disable={sourceAdded.backdrop}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputFile
                    title="Add Subtitle (.VTT)"
                    accept=".vtt"
                    id="subtitle"
                    onFileSelect={subtitleSelectHandler}
                    maxSize={512000}
                    disable={sourceAdded.subtitle}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputFile
                    title="* Add Source (.MP4)"
                    accept="video/mp4"
                    id="source"
                    onFileSelect={sourceSelectHandler}
                  />
                </Grid>
              </Grid>
              <Box marginTop={3}>
                <ButtonLoading
                  size="large"
                  isLoading={addSourceLoading}
                  type="button"
                  onClick={addSourceHandler}
                  disabled={!addSourceIsValid}>
                  {buttonLabel}
                </ButtonLoading>
              </Box>
            </Box>
          </form>
        )}
      </div>
    </Modal>
  );
};
export default AddOrUpdateModal;
