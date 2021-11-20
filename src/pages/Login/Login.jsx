import React, { useEffect, useState } from 'react';
import {
  Typography,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core';

import useStyles from './Login.styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Redirect, useLocation } from 'react-router-dom';
import { useInput } from '../../hooks/use-input';
import { passwordschema, emailSchema } from '../../schemas';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth.slice';
import { uiActions } from '../../slices/ui.slice';
import { toast } from 'react-toastify';

function Login() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const {
    enteredInput: email,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputReset: emailReset,
    inputIsValid: emailIsvalid,
    hasError: emailHasError,
    errorMsg: emailErrorMessage,
  } = useInput(emailSchema);

  const {
    enteredInput: password,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputReset: passwordReset,
    inputIsValid: passwordIsvalid,
    hasError: passwordHasError,
    errorMsg: passwordErrorMessage,
  } = useInput(passwordschema);

  const formIsValid = emailIsvalid && passwordIsvalid;

  const toggleShowPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    setError(null);
    try {
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();
      emailReset();
      passwordReset();
      //vghuy17ck1@gmail.com
      //Abcxyz123
    } catch (error) {
      toast.error(error);
      setError(error);
    }
  };
  useEffect(() => {
    dispatch(uiActions.controlHandler(true));
  }, [dispatch]);

  if (isAuthenticated) {
    if (user.banned) {
      return <div className={classes.root}>Banned</div>;
    }
    if (user.verified) {
      return <Redirect to={location.state?.from || '/'} />;
    }
    if (!user.verified) {
      return <Redirect to="/confirm-email" />;
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <Typography variant="h6" className={classes.title}>
            Login to ADMIN
          </Typography>
          <div className={classes.formControl}>
            <FormControl
              error={emailHasError}
              variant="filled"
              fullWidth
              className={classes.textField}>
              <InputLabel htmlFor="email" className={classes.inputLabel}>
                Email
              </InputLabel>
              <FilledInput
                value={email}
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
                id="email"
                type="text"
              />
            </FormControl>
            {emailHasError && (
              <FormHelperText className={classes.errorMessage}>{emailErrorMessage}</FormHelperText>
            )}
          </div>

          <div className={classes.formControl}>
            <FormControl
              error={passwordHasError}
              className={classes.textField}
              variant="filled"
              fullWidth>
              <InputLabel htmlFor="password" className={classes.inputLabel}>
                Password
              </InputLabel>
              <FilledInput
                value={password}
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={classes.inputField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={toggleShowPasswordHandler}
                      onMouseDown={mouseDownPasswordHandler}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {passwordHasError && (
              <FormHelperText className={classes.errorMessage}>
                {passwordErrorMessage}
              </FormHelperText>
            )}
          </div>

          {error && <FormHelperText className={classes.resError}>{error}</FormHelperText>}
          <ButtonLoading size="large" isLoading={isLoading} type="submit" disabled={!formIsValid}>
            Login
          </ButtonLoading>
        </form>
      </div>
    </div>
  );
}

export default Login;
