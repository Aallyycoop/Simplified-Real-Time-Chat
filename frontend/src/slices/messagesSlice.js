import { createSlice, current } from '@reduxjs/toolkit';
import fetchData from './fetchData';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
      console.log('currentMessages', current(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;

        console.log('action.payload', action.payload);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter((message) => message.channelId !== payload.id);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
