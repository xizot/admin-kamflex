import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const mediaAdd = createAsyncThunk(
  'media/mediaAdd',
  async (
    {
      type,
      title,
      originalTitle,
      overview,
      genres,
      originalLanguage,
      producers,
      runtime,
      adult,
      releaseDate,
    },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.post(`/api/media`, {
          type,
          title,
          originalTitle,
          overview,
          genres,
          originalLanguage,
          producers,
          runtime,
          adult,
          releaseDate,
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

export const mediaGetAll = createAsyncThunk(
  'media/mediaGetAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/media?page=${page}&limit=${limit}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaGetById = createAsyncThunk(
  'media/mediaGetAll',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/media/${id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaUpdate = createAsyncThunk(
  'media/mediaUpdate',
  async (
    {
      id,
      type,
      title,
      originalTitle,
      overview,
      genres,
      originalLanguage,
      producers,
      runtime,
      adult,
      releaseDate,
    },
    { rejectWithValue }
  ) => {
    try {
      return (
        await axiosInstance.patch(`/api/media/${id}`, {
          title,
          originalTitle,
          overview,
          genres,
          originalLanguage,
          producers,
          runtime,
          adult,
          releaseDate,
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

export const mediaDeleteById = createAsyncThunk(
  'media/mediaDelete',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/api/media/${id}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaAddTrailer = createAsyncThunk(
  'media/mediaAddTrailer',
  async ({ id, url }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/api/media/${id}/videos`, {
          url,
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

export const mediaGetTrailer = createAsyncThunk(
  'media/mediaGetTrailer',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/media/${id}/videos`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaDeleteTrailer = createAsyncThunk(
  'media/mediaDeleteTrailer',
  async ({ id, videoId }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/api/media/${id}/videos/${videoId}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaUpdatePoster = createAsyncThunk(
  'media/mediaUpdatePoster',
  async ({ id, file }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.patch(`/api/media/${id}/poster`, {
          file,
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

export const mediaDeletePoster = createAsyncThunk(
  'media/mediaDeletePoster',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/api/media/${id}/poster`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaUpdateBackdrop = createAsyncThunk(
  'media/mediaUpdateBackdrop',
  async ({ id, file }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.patch(`/api/media/${id}/backdrop`, {
          file,
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

export const mediaDeleteBackdrop = createAsyncThunk(
  'media/mediaDeleteBackdrop',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/api/media/${id}/backdrop`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaAddSubtitle = createAsyncThunk(
  'media/mediaAddSubtitle',
  async ({ id, file }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/api/media/${id}/subtitles`, {
          file,
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

export const mediaGetSubtitle = createAsyncThunk(
  'media/mediaGetSubtitle',
  async ({ id }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(`/api/media/${id}/subtitles`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaDeleteSubtitle = createAsyncThunk(
  'media/mediaDeleteSubtitle',
  async ({ id, subtitleId }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.delete(`/api/media/${id}/subtitles/${subtitleId}`)).data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const mediaAddSource = createAsyncThunk(
  'media/mediaAddSource',
  async ({ id, filename, mimeType, size }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/api/media/${id}/movie/source`, {
          filename,
          mimeType,
          size,
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

export const mediaAddSourceSession = createAsyncThunk(
  'media/mediaAddSourceSession',
  async ({ id, sessionId, fileId }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.post(`/api/media/${id}/movie/source/${sessionId}`, {
          fileId,
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

const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState: {
    totalPages: 0,
    totalResults: 0,
    page: 0,
    results: [],
  },
  reducers: {},
  extraReducers: {
    [mediaGetAll.fulfilled]: (state, action) => {
      const { totalPages, totalResults, page, results } = action.payload;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
      state.page = page;
      state.results = results;
    },
  },
});

export const mediaActions = mediaSlice.actions;
export default mediaSlice;
