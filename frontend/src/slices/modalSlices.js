import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
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
  },
});

export const { actions } = modalSlices;
export default modalSlices.reducer;
