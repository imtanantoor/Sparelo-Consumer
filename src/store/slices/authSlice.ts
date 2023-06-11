import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';

const initialState: {
  authenticated: boolean;
  showOnBoarding: boolean;
  mode: 'buyer' | 'vendor';
  registering: boolean;
  registerError: boolean;
  registerSuccess: boolean;
  loggingIn: boolean;
  loginSuccess: boolean;
  loginError: boolean;
} = {
  authenticated: false,
  showOnBoarding: true,
  mode: 'buyer',
  registering: false,
  registerError: false,
  registerSuccess: false,
  loggingIn: false,
  loginError: false,
  loginSuccess: false,
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
    clearRegisteringState: state => {
      state.registerError = false;
      state.registering = false;
      state.registerSuccess = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(actions.signUpUser.pending, (state, action) => {
        state.registering = true;
        state.registerError = false;
        state.registerSuccess = false;
      })
      .addCase(actions.signUpUser.fulfilled, (state, action) => {
        state.registering = false;
        state.registerError = false;
        state.registerSuccess = true;
      })
      .addCase(actions.signUpUser.rejected, (state, action) => {
        state.registering = false;
        state.registerError = true;
        state.registerSuccess = false;
      });
  },
});

export default authSlice;
