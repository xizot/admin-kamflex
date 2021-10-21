import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    isOpenSideBar: false,
    isControlHide: false,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar;
    },
    controlHandler: (state, action) => {
      state.isControlHide = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
