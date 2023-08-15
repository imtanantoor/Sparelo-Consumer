import {createSlice} from '@reduxjs/toolkit';
import RequestCardProps from '../../models/requestCard';
import actions from '../actions';
import constants from '../../utils/constants';
import ToastService from '../../Services/ToastService';

const initialState: {
  fetching: boolean;
  error: boolean;
  data: RequestCardProps[];
  creating: boolean;
  creationFailed: boolean;
  creationSuccessful: boolean;
  fetchingRequestDetail: boolean;
  fetchingRequestDetailError: boolean;
  fetchingRequestDetailSuccess: boolean;
  requestDetail: any;
} = {
  fetching: true,
  error: false,
  creating: false,
  creationFailed: false,
  creationSuccessful: false,
  data: [],
  fetchingRequestDetail: false,
  fetchingRequestDetailError: false,
  fetchingRequestDetailSuccess: false,
  requestDetail: null,
};

function handleRequestsData(
  requests: any,
  isVendor: boolean,
): RequestCardProps[] {
  return requests.map((request: any) => ({
    id: request._id,
    category: request?.category?.name,
    make: request?.brand?.name ? request.brand.name : 'N/A',
    model: request?.model.name,
    year: request?.manufacturingYear,
    imageBackground: request?.images?.length > 0 ? request.images[0] : '',
    images:
      request?.images?.length > 0
        ? request.images.map((image: string) => image)
        : [],
    buttonDisabled: request?.numberOfBids <= 0,
    // buttonTitle: `Send Quotation`,
    buttonTitle: isVendor ? 'Send Quotation' : `${request?.bids?.length} bids`,
    audioNote: !!request?.voiceNote ? request.voiceNote : null,
  }));
}

const requestsSlice = createSlice({
  name: 'Requests',
  initialState,
  reducers: {
    resetCreationState: (state, action) => {
      state.creating = false;
      state.creationFailed = false;
      state.creationSuccessful = false;
    },
  },
  extraReducers: builder => {
    // Get All requests
    builder
      .addCase(actions.fetchRequests.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchRequests.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleRequestsData(action.payload.requests, false);
      })
      .addCase(actions.fetchRequests.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    // Get users requests
    builder
      .addCase(actions.fetchRequestsOfUser.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchRequestsOfUser.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleRequestsData(action.payload.requests, false);
      })
      .addCase(actions.fetchRequestsOfUser.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    //Create Request
    builder
      .addCase(actions.createRequest.pending, (state, action) => {
        state.creating = true;
        state.creationFailed = false;
        state.creationSuccessful = false;
      })
      .addCase(actions.createRequest.rejected, (state, action) => {
        state.creating = false;
        state.creationFailed = true;
        state.creationSuccessful = false;
      })
      .addCase(actions.createRequest.fulfilled, (state, action) => {
        state.creating = false;
        state.creationFailed = false;
        state.creationSuccessful = true;
      });
    // Vendor requests
    builder
      .addCase(actions.fetchRequestsOfVendor.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchRequestsOfVendor.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleRequestsData(action.payload.requests, true);
      })
      .addCase(actions.fetchRequestsOfVendor.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    //fetch Request Detail
    builder
      .addCase(actions.fetchRequestDetail.pending, (state, action) => {
        state.fetchingRequestDetail = true;
        state.fetchingRequestDetailError = false;
        state.fetchingRequestDetailSuccess = false;
      })
      .addCase(actions.fetchRequestDetail.fulfilled, (state, action) => {
        state.fetchingRequestDetail = false;
        state.fetchingRequestDetailError = false;
        state.fetchingRequestDetailSuccess = true;
        state.requestDetail = action.payload.request;
      })
      .addCase(actions.fetchRequestDetail.rejected, (state, action: any) => {
        state.fetchingRequestDetail = false;
        state.fetchingRequestDetailError = true;
        state.fetchingRequestDetailSuccess = false;
        ToastService.error(
          'Request Detail',
          action?.payload?.error
            ? action.payload.error
            : 'Something went wrong',
        );
      });
  },
});

export default requestsSlice;
