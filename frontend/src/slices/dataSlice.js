import axios from 'axios';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import routes from '../routes';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const response = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

const initialState = {
  messages: [],
  channels: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.channels = action.payload.channels;

        console.log('current', current(state));
      });
  },
});

export default dataSlice.reducer;
