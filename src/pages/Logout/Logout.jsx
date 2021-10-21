import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authActions } from '../../slices/auth.slice';

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(authActions.logout());
    history.push('/login');
  }, [dispatch, history]);
  return <div></div>;
}

export default Logout;
