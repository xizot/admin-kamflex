import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const genreGetAll = createAsyncThunk(
  'genre/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/genres?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const genreSlice = createSlice({
  name: 'genreSlice',
  initialState: {
    totalPages: 0,
    totalResults: 0,
    page: 0,
    results: [],
  },
  reducers: {},
  extraReducers: {
    [genreGetAll.fulfilled]: (state, action) => {
      const { totalPages, totalResults, page, results } = action.payload;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
      state.page = page;
      state.results = results;
    },
  },
});

export const genreActions = genreSlice.actions;
export default genreSlice;
