import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';

const initialState = {
  fetching: false,
  error: false,
  data: [],
};

const manufacturerSlice = createSlice({
  name: 'Manufacturer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(actions.fetchAllManufacturers.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchAllManufacturers.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = action.payload.manufacturers;
      })
      .addCase(actions.fetchAllManufacturers.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });
  },
});

export default manufacturerSlice;
