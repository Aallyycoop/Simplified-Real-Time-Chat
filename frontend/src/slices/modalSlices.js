/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
  isShown: false,
};

const modalSlices = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.isShown = true;
    },
    hideModal: (state) => {
      state.isShown = false;
    },
    setChannelId: (state, { payload }) => {
      state.channelId = payload.id;
    },
  },
});

export const { actions } = modalSlices;
export default modalSlices.reducer;
