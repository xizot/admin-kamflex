import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const genreAdd = createAsyncThunk(
  'genre/genreAdd',
  async ({ name }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/api/genres`, { name })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const genreUpdate = createAsyncThunk(
  'genre/genreUpdate',
  async ({ id, name, language }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.patch(`/api/genres/${id}`, { name, language })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const genreDelete = createAsyncThunk(
  'genre/genreDelete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/genres/${id}`).data;
      return { _id: id };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
    [genreAdd.fulfilled]: (state, action) => {
      const { _id, name, _translated } = action.payload;
      state.results?.push({ _id, name, _translated });
    },
    [genreUpdate.fulfilled]: (state, action) => {
      const { _id, name, _translated } = action.payload;
      state.results = state.results.map((item) =>
        item._id === _id ? { ...item, name, _translated } : item
      );
    },
    [genreDelete.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      state.results = state.results.filter((item) => item._id !== _id);
    },
  },
});

export const genreActions = genreSlice.actions;
export default genreSlice;
