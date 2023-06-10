import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  authenticated: boolean;
  showOnBoarding: boolean;
  mode: 'buyer' | 'vendor';
} = {
  authenticated: false,
  showOnBoarding: true,
  mode: 'buyer',
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    hideOnboarding: state => {
      state.showOnBoarding = false;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default authSlice;
