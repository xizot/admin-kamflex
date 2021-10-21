import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { decodeJwt } from '../utils/jwt';

export const authGetById = createAsyncThunk('auth/get', async (id, { rejectWithValue }) => {
  try {
    return (await axiosInstance.get(`/api/media/${id}`)).data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post('/api/auth/sign-in', {
          email,
          password,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, username, password, birthdate }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post('/api/auth/sign-up', {
          email,
          username,
          password,
          birthdate,
        })
      ).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendConfirmEmail = createAsyncThunk(
  'auth/sendConfirmEmail',
  async (_, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/api/auth/send-confirmation-email')).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async ({ id, activationCode }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/api/auth/confirm-email', { id, activationCode })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/api/auth/password-recovery', { email })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ id, recoveryCode, password }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post('/api/auth/reset-password', { id, recoveryCode, password }))
        .data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  accessToken: null,
  refreshToken: null,
};

const initReducer = (state) => {
  state.isLoading = true;
  state.isAuthenticated = false;
  state.user = {};
  state.accessToken = null;
  state.refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const authSuccess = (state, action) => {
  const { accessToken, refreshToken } = action.payload;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.user = decodeJwt(accessToken);

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    verifiedAuth: authSuccess,
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {};
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: {
    [login.pending]: initReducer,
    [login.rejected]: (state) => {
      state.isLoading = false;
    },
    [login.fulfilled]: authSuccess,
    [register.pending]: initReducer,
    [register.rejected]: (state) => {
      state.isLoading = false;
    },
    [register.fulfilled]: authSuccess,
    [confirmEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [confirmEmail.rejected]: (state) => {
      state.isLoading = false;
    },
    [confirmEmail.fulfilled]: authSuccess,
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.rejected]: (state) => {
      state.isLoading = false;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.rejected]: (state) => {
      state.isLoading = false;
    },
    [resetPassword.fulfilled]: authSuccess,
  },
});

export const authActions = authSlice.actions;
export default authSlice;
