import {createSlice} from '@reduxjs/toolkit';
import RequestCardProps from '../../models/requestCard';
import actions from '../actions';
import constants from '../../utils/constants';

const initialState: {
  fetching: boolean;
  error: boolean;
  data: RequestCardProps[];
  creating: boolean;
  creationFailed: boolean;
  creationSuccessful: boolean;
} = {
  fetching: true,
  error: false,
  creating: false,
  creationFailed: false,
  creationSuccessful: false,
  data: [],
};

function handleRequestsData(
  requests: any,
  isVendor: boolean,
): RequestCardProps[] {
  console.log({requests});
  return requests.map((request: any) => ({
    id: request._id,
    category: request?.category?.name,
    make: request?.brand?.name ? request.brand.name : 'N/A',
    model: request?.model.name,
    year: request?.manufacturingYear,
    imageBackground:
      request?.images?.length > 0 ? constants.baseURL + request.images[0] : '',
    images:
      request?.images?.length > 0
        ? request.images.map((image: string) => constants.baseURL + image)
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
  },
});

export default requestsSlice;
