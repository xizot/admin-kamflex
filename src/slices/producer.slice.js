import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const producerAdd = createAsyncThunk(
  'producer/producerAdd',
  async ({ name, country }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(`/api/producers`, { name, country })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const producerUpdate = createAsyncThunk(
  'producer/producerUpdate',
  async ({ id, name, country }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.patch(`/api/producers/${id}`, { name, country })).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const producerDelete = createAsyncThunk(
  'producer/producerDelete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/producers/${id}`).data;
      return { _id: id };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const producerGetAll = createAsyncThunk(
  'producer/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/producers?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const producerSlice = createSlice({
  name: 'producerSlice',
  initialState: {
    totalPages: 0,
    totalResults: 0,
    page: 0,
    results: [],
  },
  reducers: {},
  extraReducers: {
    [producerGetAll.fulfilled]: (state, action) => {
      const { totalPages, totalResults, page, results } = action.payload;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
      state.page = page;
      state.results = results;
    },
    [producerAdd.fulfilled]: (state, action) => {
      state.results = [...state.results, action.payload];
    },
    [producerUpdate.fulfilled]: (state, action) => {
      const { _id, name, country } = action.payload;
      state.results = state.results.map((item) =>
        item._id === _id ? { ...item, name, country: country } : item
      );
    },
    [producerDelete.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      state.results = state.results.filter((item) => item._id !== _id);
    },
  },
});

export const producerActions = producerSlice.actions;
export default producerSlice;
