import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import AvailabilityCardModel from '../../models/AvailabilityCardsModel';
import {constant} from 'lodash';
import constants from '../../utils/constants';
import ToastService from '../../Services/ToastService';

const initialState: {
  fetching: boolean;
  error: boolean;
  checkingAvailability: boolean;
  checkingAvailabilitySuccess: boolean;
  checkingAvailabilityError: boolean;
  data: AvailabilityCardModel[];
} = {
  fetching: true,
  error: false,
  checkingAvailability: false,
  checkingAvailabilitySuccess: false,
  checkingAvailabilityError: false,
  data: [],
};

function handleAvailabilityResponse(response: any): AvailabilityCardModel[] {
  return response.map((item: any) => ({
    id: item?._id,
    bid: item.bid._id,
    images:
      item?.bid?.images && item?.bid?.images.length > 0
        ? item?.bid?.images?.map((image: string) => constants.baseURL + image)
        : [],
    make: item?.bid?.request?.brand?.name,
    model: item?.bid?.request?.model?.name,
    year: item?.request?.manufacturingYear,
    isNew: item?.bid?.isNew,
    price: item?.bid?.price,
    available: item?.isAvaiable,
    quantity: item?.bid?.request?.quantity,
    rating: item?.user?.rating,
    availibilityStatus: item?.bid?.availibilityStatus,
  }));
}

const availabilitySlice = createSlice({
  name: 'Availability',
  initialState,
  reducers: {
    resetCheckingState: state => {
      state.checkingAvailability = false;
      state.checkingAvailabilitySuccess = false;
      state.checkingAvailabilityError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        actions.fetchAllAvailableItemsOfUser.pending,
        (state, action) => {
          state.fetching = true;
          state.error = false;
        },
      )
      .addCase(
        actions.fetchAllAvailableItemsOfUser.fulfilled,
        (state, action: any) => {
          state.fetching = false;
          state.error = false;
          state.data = handleAvailabilityResponse(
            action.payload.availabilityRequests,
          );
        },
      )
      .addCase(
        actions.fetchAllAvailableItemsOfUser.rejected,
        (state, action) => {
          state.fetching = false;
          state.error = true;
        },
      );

    builder
      .addCase(actions.checkAvailability.pending, (state, action) => {
        state.checkingAvailability = true;
        state.checkingAvailabilitySuccess = false;
        state.checkingAvailabilityError = false;
      })
      .addCase(actions.checkAvailability.fulfilled, (state, action) => {
        state.checkingAvailability = false;
        state.checkingAvailabilitySuccess = true;
        state.checkingAvailabilityError = false;
      })
      .addCase(actions.checkAvailability.rejected, (state, action) => {
        state.checkingAvailability = false;
        state.checkingAvailabilitySuccess = false;
        ToastService.error(
          'Availability',
          action?.error?.message
            ? action.error.message
            : 'Something went wrong, please try again',
        );
        state.checkingAvailabilityError = true;
      });
  },
});

export default availabilitySlice;
