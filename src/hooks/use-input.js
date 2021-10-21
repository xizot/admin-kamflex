import { useEffect, useState } from 'react';
const Joi = require('joi');

export const useInput = (schemaJson = null, initialState = '') => {
  const [enteredInput, setEnteredInput] = useState(initialState);
  const [isTouched, setIsTouched] = useState(false);
  let inputIsValid = true;

  let errorMsg = null;
  if (schemaJson) {
    const schema = Joi.object(schemaJson);
    const { error } = schema.validate({ value: enteredInput });
    if (error) {
      errorMsg = error.toString();
      inputIsValid = false;
    }
  }

  const hasError = !inputIsValid && isTouched;
  const inputChangeHandler = (e) => {
    setEnteredInput(e.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const inputReset = () => {
    setIsTouched(false);
    setEnteredInput('');
  };

  useEffect(() => {
    setEnteredInput(initialState);
  }, [initialState]);

  return {
    enteredInput,
    inputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputReset,
    setEnteredInput,
    errorMsg,
    isTouched,
  };
};
