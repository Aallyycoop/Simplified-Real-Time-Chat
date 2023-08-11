/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
};

const modalSlices = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
    },
    hideModal: (state) => {
      state.type = null;
    },
    setChannelId: (state, { payload }) => {
      state.channelId = payload.id;
      console.log('channelId', current(state));
    },
  },
});

export const { actions } = modalSlices;
export default modalSlices.reducer;
