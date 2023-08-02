import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import OrderHistoryCardProps from '../../models/orderHistoryCardProps';
import ToastService from '../../Services/ToastService';

interface OrdersSlice {
  ordersHistory: any[];
  fetchingOrdersHistory: boolean;
  fetchingOrdersHistorySuccess: boolean;
  fetchingOrdersHistoryError: boolean;
  changingOrderStatus: boolean;
  changingOrderStatusError: boolean;
  changingOrderStatusSuccess: boolean;
  changingStatusType: 'approve' | 'cancel' | '';
}

const initialState: OrdersSlice = {
  ordersHistory: [],
  fetchingOrdersHistory: false,
  fetchingOrdersHistoryError: false,
  fetchingOrdersHistorySuccess: false,
  changingOrderStatus: false,
  changingOrderStatusError: false,
  changingOrderStatusSuccess: false,
  changingStatusType: '',
};

function handleOrdersHistoryResponse(data: any): OrderHistoryCardProps[] {
  return data.map((order: any) => {
    let requestData = order?.requests?.[0] ? order.requests[0] : null;

    if (requestData)
      return {
        id: order?._id ?? '',
        images: requestData?.images?.map((image: string) => image),
        make: requestData?.brand?.name,
        model: requestData?.model?.name,
        year: requestData?.manufacturingYear,
        requestedBy: order?.orderBy?.name,
        category: requestData?.category?.name,
        orderStatus: order?.status,
      };

    return {
      id: order?._id ?? '',
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

    //Approve Order
    builder
      .addCase(actions.approveOrder.pending, (state, action) => {
        state.changingOrderStatus = true;
        state.changingOrderStatusError = false;
        state.changingOrderStatusSuccess = false;
        state.changingStatusType = 'approve';
      })
      .addCase(actions.approveOrder.fulfilled, (state, action) => {
        state.changingOrderStatus = false;
        state.changingOrderStatusError = false;
        state.changingOrderStatusSuccess = true;
        state.changingStatusType = '';
      })
      .addCase(actions.approveOrder.rejected, (state, action: any) => {
        state.changingOrderStatus = false;
        state.changingOrderStatusError = true;
        state.changingOrderStatusSuccess = false;
        state.changingStatusType = '';
        ToastService.error(
          'Orders',
          action?.payload?.error
            ? action.payload.error
            : 'Something went wrong',
        );
      });

    //Cancel Order
    builder
      .addCase(actions.cancelOrder.pending, (state, action) => {
        state.changingOrderStatus = true;
        state.changingOrderStatusError = false;
        state.changingOrderStatusSuccess = false;
        state.changingStatusType = 'approve';
      })
      .addCase(actions.cancelOrder.fulfilled, (state, action) => {
        state.changingOrderStatus = false;
        state.changingOrderStatusError = false;
        state.changingOrderStatusSuccess = true;
        state.changingStatusType = '';
      })
      .addCase(actions.cancelOrder.rejected, (state, action: any) => {
        state.changingOrderStatus = false;
        state.changingOrderStatusError = true;
        state.changingOrderStatusSuccess = false;
        state.changingStatusType = '';
        ToastService.error(
          'Orders',
          action?.payload?.error
            ? action.payload.error
            : 'Something went wrong',
        );
      });
  },
});

export default ordersSlice;
