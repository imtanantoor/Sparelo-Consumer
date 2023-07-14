import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import ToastService from '../../Services/ToastService';
import {useNavigation} from '@react-navigation/native';

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
  creatingShop: boolean;
  creatingShopSuccess: boolean;
  creatingShopFailure: boolean;
  fetchingShop: boolean;
  fetchShopSuccess: boolean;
  fetchShopError: boolean;
  shopDetails: any;
  updatingShop: boolean;
  updateShopSuccess: boolean;
  updateShopError: boolean;
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
  creatingShop: false,
  creatingShopSuccess: false,
  creatingShopFailure: false,
  fetchingShop: false,
  fetchShopError: false,
  fetchShopSuccess: false,
  shopDetails: null,
  updatingShop: false,
  updateShopError: false,
  updateShopSuccess: false,
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
    resetCreateShopState: state => {
      state.creatingShop = false;
      state.creatingShopSuccess = false;
      state.creatingShopFailure = false;
    },
    resetFetchShopState: state => {
      state.fetchingShop = false;
      state.fetchShopError = false;
      state.fetchShopSuccess = false;
    },
    resetUpdateShopState: state => {
      state.updatingShop = false;
      state.updateShopError = false;
      state.updateShopSuccess = false;
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

    // Create Shop
    builder
      .addCase(actions.createShop.pending, (state, action) => {
        state.creatingShop = true;
        state.creatingShopFailure = false;
        state.creatingShopSuccess = false;
      })
      .addCase(actions.createShop.fulfilled, (state, action) => {
        state.creatingShop = false;
        state.creatingShopFailure = false;
        state.creatingShopSuccess = true;
      })
      .addCase(actions.createShop.rejected, (state, action) => {
        state.creatingShop = false;
        state.creatingShopFailure = true;
        state.creatingShopSuccess = false;
      });

    // Fetch Shop
    builder
      .addCase(actions.fetchShop.pending, (state, action) => {
        state.fetchingShop = true;
        state.fetchShopError = false;
        state.fetchShopSuccess = false;
      })
      .addCase(actions.fetchShop.fulfilled, (state, action) => {
        state.fetchingShop = false;
        state.fetchShopError = false;
        state.fetchShopSuccess = true;
        state.shopDetails = action.payload ? {...action.payload.shop} : null;
      })
      .addCase(actions.fetchShop.rejected, (state, action) => {
        state.fetchingShop = false;
        state.fetchShopError = true;
        state.fetchShopSuccess = false;
        ToastService.error(
          'Shop Details',
          action?.error?.message
            ? action.error.message
            : 'Something went wrong',
        );
      });

    // Update Shop
    builder
      .addCase(actions.updateShop.pending, (state, action) => {
        state.updatingShop = true;
        state.updateShopError = false;
        state.updateShopSuccess = false;
      })
      .addCase(actions.updateShop.fulfilled, (state, action) => {
        state.updatingShop = false;
        state.updateShopError = false;
        state.updateShopSuccess = true;
        // state.shopDetails = action.payload ? {...action.payload.shop} : null;
      })
      .addCase(actions.updateShop.rejected, (state, action) => {
        state.updatingShop = false;
        state.updateShopError = true;
        state.updateShopSuccess = false;
        ToastService.error(
          'Update Shop Details',
          action?.error?.message
            ? action.error.message
            : 'Something went wrong',
        );
      });
  },
});

export default authSlice;
