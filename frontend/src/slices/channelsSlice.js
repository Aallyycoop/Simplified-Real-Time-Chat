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
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      const renamingChannel = state.channels.find((channel) => channel.id === payload.id);
      renamingChannel.name = payload.name;

      // console.log('currentChan', current(state, payload));
    },

    // renameChannel: (state, { payload: { id, name } }) => {
    //   const channel = state.channels.find((ch) => (ch.id === id));
    //   channel.name = name;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;

        console.log('currentChannels', current(state));
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
