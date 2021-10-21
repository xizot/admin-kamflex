import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const updateStatus = createAsyncThunk(
  'user/updateStatus',
  async ({ id, banned }, { rejectWithValue }) => {
    console.log(id, banned);
    try {
      return (await axiosInstance.patch(`/api/users/${id}`, { banned })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAll = createAsyncThunk(
  'user/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/users?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    totalPages: 0,
    totalResults: 0,
    page: 0,
    results: [],
  },
  reducers: {
    updateStatus: (state, action) => {
      const { id, banned } = action.payload;
      state.results = state.results.map((item) =>
        item._id === id ? { ...item, banned: banned } : item
      );
    },
  },
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      const { totalPages, totalResults, page, results } = action.payload;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
      state.page = page;
      state.results = results;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
