import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showOnBoarding: true,
};

const globalConfig = createSlice({
  name: 'GlobalConfig',
  initialState,
  reducers: {
    hideOnboarding: state => {
      state.showOnBoarding = false;
    },
  },
});

export default globalConfig;
