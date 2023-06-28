import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import ToastService from '../../Services/ToastService';

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
  user: null | UserModel;
  accessToken: string;
  updatingUser: boolean;
  updatingUserError: boolean;
  updatingUserSuccess: boolean;
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
  user: null,
  accessToken: '',
  updatingUser: false,
  updatingUserError: false,
  updatingUserSuccess: false,
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
    resetUpdateUserState: state => {
      state.updatingUser = false;
      state.updatingUserError = false;
      state.updatingUserSuccess = false;
    },
    logout: state => initialState,
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
        ToastService.error(
          'Sign up',
          action?.error?.message
            ? action.error.message
            : 'Something went wrong',
        );
      });

    builder
      .addCase(actions.loginUser.pending, (state, action) => {
        state.loggingIn = true;
        state.loginError = false;
        state.loginSuccess = false;
      })
      .addCase(actions.loginUser.fulfilled, (state, action) => {
        const {payload}: any = action;

        state.loggingIn = false;
        state.loginError = false;
        state.loginSuccess = true;
        state.accessToken = payload?.accessToken;
        state.user = {...payload?.user};
      })
      .addCase(actions.loginUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = true;
        state.loginSuccess = false;
        ToastService.error(
          'Login',
          action?.error?.message
            ? action.error.message
            : 'Something went wrong',
        );
      });

    builder
      .addCase(actions.updateUser.pending, (state, action) => {
        state.updatingUser = true;
        state.updatingUserSuccess = false;
        state.updatingUserError = false;
      })
      .addCase(actions.updateUser.fulfilled, (state, action) => {
        state.updatingUser = false;
        state.updatingUserSuccess = true;
        state.updatingUserError = false;
        if (action?.payload?.user) {
          state.user = action?.payload?.user;
        }
      })
      .addCase(actions.updateUser.rejected, (state, action) => {
        state.updatingUser = false;
        state.updatingUserSuccess = false;
        state.updatingUserError = true;
        ToastService.error(
          'Update User Fail',
          action?.error?.message
            ? action?.error?.message
            : 'Updating User failed',
        );
      });
  },
});

export default authSlice;
