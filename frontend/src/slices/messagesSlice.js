import { createSlice, current } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;

        console.log('action.payload', action.payload);

        console.log('currentMessages', current(state));
      });
  },
});

export default messagesSlice.reducer;
