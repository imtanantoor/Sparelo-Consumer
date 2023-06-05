import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  showOnBoarding: true,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    hideOnboarding: state => {
      state.showOnBoarding = false;
    },
  },
});

export default authSlice;
