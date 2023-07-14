import { createSlice, current } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;

        // console.log('action.payload', action.payload);

        console.log('currentChannels', current(state));
      });
  },
});

export const { setChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
