import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import OrderHistoryCardProps from '../../models/orderHistoryCardProps';
import constants from '../../utils/constants';

interface OrdersSlice {
  ordersHistory: any[];
  fetchingOrdersHistory: boolean;
  fetchingOrdersHistorySuccess: boolean;
  fetchingOrdersHistoryError: boolean;
}

const initialState: OrdersSlice = {
  ordersHistory: [],
  fetchingOrdersHistory: false,
  fetchingOrdersHistoryError: false,
  fetchingOrdersHistorySuccess: false,
};

function handleOrdersHistoryResponse(data: any): OrderHistoryCardProps[] {
  return data.map((order: any) => {
    let requestData = order?.requests?.[0] ? order.requests[0] : null;

    if (requestData)
      return {
        images: requestData?.images?.map(
          (image: string) => constants.baseURL + image,
        ),
        make: requestData?.brand?.name,
        model: requestData?.model?.name,
        year: requestData?.manufacturingYear,
        requestedBy: order?.orderBy?.name,
        category: requestData?.category?.name,
        orderStatus: order?.status,
      };

    return {
      images: [],
      make: '',
      model: '',
      year: '',
      requestedBy: order?.orderBy?.name,
      category: '',
    };
  });
}

const ordersSlice = createSlice({
  name: 'Orders',
  reducers: {},
  initialState,
  extraReducers: builder => {
    // fetch buyer orders history
    builder
      .addCase(actions.fetchOrdersHistory.pending, (state, action) => {
        state.fetchingOrdersHistory = true;
        state.fetchingOrdersHistoryError = false;
        state.fetchingOrdersHistorySuccess = false;
      })
      .addCase(actions.fetchOrdersHistory.fulfilled, (state, action) => {
        state.fetchingOrdersHistory = false;
        state.fetchingOrdersHistoryError = false;
        state.fetchingOrdersHistorySuccess = true;
        state.ordersHistory = handleOrdersHistoryResponse(
          action.payload.orders,
        );
      })
      .addCase(actions.fetchOrdersHistory.rejected, (state, action) => {
        state.fetchingOrdersHistory = false;
        state.fetchingOrdersHistoryError = true;
        state.fetchingOrdersHistorySuccess = false;
      });

    // fetch vendor orders history
    builder
      .addCase(actions.fetchVendorsOrderHistory.pending, (state, action) => {
        state.fetchingOrdersHistory = true;
        state.fetchingOrdersHistoryError = false;
        state.fetchingOrdersHistorySuccess = false;
      })
      .addCase(actions.fetchVendorsOrderHistory.fulfilled, (state, action) => {
        state.fetchingOrdersHistory = false;
        state.fetchingOrdersHistoryError = false;
        state.fetchingOrdersHistorySuccess = true;
        state.ordersHistory = handleOrdersHistoryResponse(
          action.payload.orders,
        );
      })
      .addCase(actions.fetchVendorsOrderHistory.rejected, (state, action) => {
        state.fetchingOrdersHistory = false;
        state.fetchingOrdersHistoryError = true;
        state.fetchingOrdersHistorySuccess = false;
      });
  },
});

export default ordersSlice;
