import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const response = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

export default fetchData;
