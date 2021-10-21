import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import uiSlice from '../slices/ui.slice';
import userSlice from '../slices/user.slice';
import genreSlice from '../slices/genre.slice';
import producerSlice from '../slices/producer.slice';
import mediaSlice from '../slices/media.slice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    genre: genreSlice.reducer,
    producer: producerSlice.reducer,
    media: mediaSlice.reducer,
  },
});
