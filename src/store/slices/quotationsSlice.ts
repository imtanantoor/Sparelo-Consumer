import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import QuotationsCardModel from '../../models/QuotationsCardModel';
import constants from '../../utils/constants';

interface QuotationsState {
  fetchingCancelledQuotations: boolean;
  fetchingApprovedQuotations: boolean;
  fetchingPendingQuotations: boolean;
  fetchingCancelledQuotationsSuccess: boolean;
  fetchingCancelledQuotationsFailure: boolean;
  fetchingApprovedQuotationsSuccess: boolean;
  fetchingApprovedQuotationsFailure: boolean;
  fetchingPendingQuotationsSuccess: boolean;
  fetchingPendingQuotationsFailure: boolean;
  deletingQuotation: boolean;
  deleteSuccess: boolean;
  deleteError: boolean;
  cancelledQuotations: QuotationsCardModel[];
  approvedQuotations: QuotationsCardModel[];
  pendingQuotations: QuotationsCardModel[];
}

const initialState: QuotationsState = {
  fetchingCancelledQuotations: false,
  fetchingApprovedQuotations: false,
  fetchingPendingQuotations: false,
  fetchingCancelledQuotationsSuccess: false,
  fetchingCancelledQuotationsFailure: false,
  fetchingApprovedQuotationsSuccess: false,
  fetchingApprovedQuotationsFailure: false,
  fetchingPendingQuotationsSuccess: false,
  fetchingPendingQuotationsFailure: false,
  deletingQuotation: false,
  deleteSuccess: false,
  deleteError: false,
  cancelledQuotations: [],
  approvedQuotations: [],
  pendingQuotations: [],
};

function handleQuotationsResponse(bids: any): QuotationsCardModel[] {
  return bids.map((bid: any, index: number) => ({
    id: bid?.request?._id,
    bid: bid?._id,
    images: bid?.request?.images.map((image: string) => image),
    make: bid?.request?.brand?.name ? bid?.request?.brand?.name : 'make',
    model: bid?.request?.model?.name ? bid?.request?.model?.name : 'model',
    year: bid?.request?.manufacturingYear
      ? bid?.request?.manufacturingYear
      : 'year',
    price: bid?.price,
    audioNote: bid?.request?.voiceNote ? bid?.request?.voiceNote : '',
    quantity: bid?.quantity,
    rating: bid?.user?.rating,
    offeredBy: bid?.user?.name,
  }));
}

const QuotationsSlice = createSlice({
  name: 'Quotations',
  reducers: {
    resetDeleteState: state => {
      state.deletingQuotation = false;
      state.deleteError = false;
      state.deleteSuccess = false;
    },
  },
  initialState: initialState,
  extraReducers: builder => {
    // Cancelled Quotations
    builder
      .addCase(actions.fetchCancelledQuotations.pending, (state, action) => {
        state.fetchingCancelledQuotations = true;
        state.fetchingCancelledQuotationsFailure = false;
        state.fetchingCancelledQuotationsSuccess = false;
      })
      .addCase(actions.fetchCancelledQuotations.rejected, (state, action) => {
        state.fetchingCancelledQuotations = false;
        state.fetchingCancelledQuotationsFailure = true;
        state.fetchingCancelledQuotationsSuccess = false;
      })
      .addCase(actions.fetchCancelledQuotations.fulfilled, (state, action) => {
        state.fetchingCancelledQuotations = false;
        state.fetchingCancelledQuotationsFailure = false;
        state.fetchingCancelledQuotationsSuccess = true;
        state.cancelledQuotations = handleQuotationsResponse(
          action.payload.bids,
        );
      });

    // Pending Quotations
    builder
      .addCase(actions.fetchPendingQuotations.pending, (state, action) => {
        state.fetchingPendingQuotations = true;
        state.fetchingPendingQuotationsFailure = false;
        state.fetchingPendingQuotationsSuccess = false;
      })
      .addCase(actions.fetchPendingQuotations.rejected, (state, action) => {
        state.fetchingPendingQuotations = false;
        state.fetchingPendingQuotationsFailure = true;
        state.fetchingPendingQuotationsSuccess = false;
      })
      .addCase(actions.fetchPendingQuotations.fulfilled, (state, action) => {
        state.fetchingPendingQuotations = false;
        state.fetchingPendingQuotationsFailure = false;
        state.fetchingPendingQuotationsSuccess = true;
        state.pendingQuotations = handleQuotationsResponse(action.payload.bids);
      });

    // Approved Quotations
    builder
      .addCase(actions.fetchApprovedQuotations.pending, (state, action) => {
        state.fetchingApprovedQuotations = true;
        state.fetchingApprovedQuotationsFailure = false;
        state.fetchingApprovedQuotationsSuccess = false;
      })
      .addCase(actions.fetchApprovedQuotations.rejected, (state, action) => {
        state.fetchingApprovedQuotations = false;
        state.fetchingApprovedQuotationsFailure = true;
        state.fetchingApprovedQuotationsSuccess = false;
      })
      .addCase(actions.fetchApprovedQuotations.fulfilled, (state, action) => {
        state.fetchingApprovedQuotations = false;
        state.fetchingApprovedQuotationsFailure = false;
        state.fetchingApprovedQuotationsSuccess = true;
        state.approvedQuotations = handleQuotationsResponse(
          action.payload.bids,
        );
      });

    // Delete Quotation
    builder
      .addCase(actions.deleteQuotation.pending, (state, action) => {
        state.deletingQuotation = true;
        state.deleteError = false;
        state.deleteSuccess = false;
      })
      .addCase(actions.deleteQuotation.rejected, (state, action) => {
        state.deletingQuotation = false;
        state.deleteError = true;
        state.deleteSuccess = false;
      })
      .addCase(actions.deleteQuotation.fulfilled, (state, action) => {
        state.deletingQuotation = false;
        state.deleteError = false;
        state.deleteSuccess = true;
      });
  },
});

export default QuotationsSlice;
