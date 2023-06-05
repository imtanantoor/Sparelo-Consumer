import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import AvailabilityCardModel from '../../models/AvailabilityCardsModel';
import {constant} from 'lodash';
import constants from '../../utils/constants';

const initialState: {
  fetching: boolean;
  error: boolean;
  data: AvailabilityCardModel[];
} = {
  fetching: true,
  error: false,
  data: [],
};

function handleAvailabilityResponse(response: any): AvailabilityCardModel[] {
  return response.map((item: any) => ({
    id: item.request,
    bid: item._id,
    images:
      item?.request?.images && item.request.images.length > 0
        ? item?.request.images?.map(
            (image: string) => constants.baseURL + image,
          )
        : [],
    make: item?.request?.brand?.name,
    model: item?.request?.model?.name,
    year: item?.request?.manufacturingYear,
    isNew: item?.isNew,
    price: item?.price,
    available: item?.isAvaiable,
    quantity: item?.request?.quantity,
    rating: item?.user?.rating,
  }));
}

const availabilitySlice = createSlice({
  name: 'Availability',
  initialState,
  reducers: {},
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
          state.data = handleAvailabilityResponse(action.payload.bids);
        },
      )
      .addCase(
        actions.fetchAllAvailableItemsOfUser.rejected,
        (state, action) => {
          state.fetching = false;
          state.error = true;
        },
      );
  },
});

export default availabilitySlice;
