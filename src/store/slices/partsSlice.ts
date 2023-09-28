import {createSlice} from '@reduxjs/toolkit';
import PartsCardModel from '../../models/partsCard';
import actions from '../actions';
import constants from '../../utils/constants';
import ToastService from '../../Services/ToastService';

interface PartsState {
  fetching: boolean;
  error: boolean;
  fetchingAllParts: boolean;
  fetchingAllPartsError: boolean;
  fetchingOldParts: boolean;
  fetchingOldPartsError: boolean;
  searchingParts: boolean;
  searchingPartsFailed: boolean;
  creatingQuotation: boolean;
  creatingQuotationSuccess: boolean;
  creatingQuotationFailure: boolean;
  fetchingBidDetail: boolean;
  fetchingBidDetailError: boolean;
  fetchingBidDetailSuccess: boolean;
  bidDetail: any;
  newParts: PartsCardModel[];
  oldParts: PartsCardModel[];
  allParts: PartsCardModel[];
  searchedParts: {
    newParts: PartsCardModel[];
    oldParts: PartsCardModel[];
    allParts: PartsCardModel[];
  };
}

const initialState: PartsState = {
  fetching: true,
  error: false,
  fetchingAllParts: true,
  fetchingAllPartsError: false,
  fetchingOldParts: true,
  fetchingOldPartsError: false,
  searchingParts: true,
  searchingPartsFailed: false,
  creatingQuotation: false,
  creatingQuotationSuccess: false,
  creatingQuotationFailure: false,
  fetchingBidDetail: false,
  fetchingBidDetailError: false,
  fetchingBidDetailSuccess: false,
  bidDetail: null,
  newParts: [],
  oldParts: [],
  allParts: [],
  searchedParts: {
    newParts: [],
    oldParts: [],
    allParts: [],
  },
};

function handleSearchedPartsResponse(
  newPartsData: any[],
  oldPartsData: any[],
  allPartsData: any[],
) {
  let newParts = handlePartsResponse(newPartsData, true);
  let oldParts = handlePartsResponse(oldPartsData, true);
  let allParts = handlePartsResponse(allPartsData, true);

  return {
    newParts,
    oldParts,
    allParts,
  };
}

function handlePartsResponse(bids: any, isSearch: boolean): PartsCardModel[] {
  if (isSearch)
    return bids.map((part: any, index: number) => ({
      id: part?._id,
      bid: part?.bids[index]?._id ? part?.bids[index]?._id : 0,
      images: part?.images.map((image: string) => image),
      make: part?.brand?.name ? part?.brand?.name : 'make',
      model: part?.model?.name ? part?.model?.name : 'model',
      year: part?.manufacturingYear ? part?.manufacturingYear : 'year',
      price: part?.bids[index]?.price ? part?.bids[index]?.price : '',
      audioNote: part?.voiceNote ? part.voiceNote : '',
      quantity: part?.bids?.length,
      rating: part?.user?.rating ? part?.user?.rating : 0,
    }));

  return bids.map((bid: any, index: number) => ({
    id: bid?.request?._id,
    bid: bid?._id,
    images: bid?.images.map((image: string) => image),
    make: bid?.request?.brand?.name ? bid?.request?.brand?.name : 'make',
    model: bid?.request?.model?.name ? bid?.request?.model?.name : 'model',
    year: bid?.request?.manufacturingYear
      ? bid?.request?.manufacturingYear
      : 'year',
    price: bid?.price,
    // audioNote: bid?.request?.voiceNote ? bid?.request?.voiceNote : '',
    audioNote: bid?.voiceNote ? bid?.voiceNote : '',
    quantity: bid?.quantity,
    offeredBy: bid?.user?.name,
    rating: bid?.user?.rating,
  }));
}

const partsSlice = createSlice({
  name: 'Parts',
  initialState,
  reducers: {
    resetCreateQuotationState: (state, action) => {
      state.creatingQuotation = false;
      state.creatingQuotationSuccess = false;
      state.creatingQuotationFailure = false;
    },
    resetPartsState: () => initialState,
  },
  extraReducers: builder => {
    // New Parts
    builder
      .addCase(actions.fetchNewParts.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchNewParts.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.newParts = handlePartsResponse(action.payload.bids, false);
      })
      .addCase(actions.fetchNewParts.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    // Old Parts
    builder
      .addCase(actions.fetchOldParts.pending, (state, action) => {
        state.fetchingOldParts = true;
        state.fetchingOldPartsError = false;
      })
      .addCase(actions.fetchOldParts.fulfilled, (state, action) => {
        state.fetchingOldParts = false;
        state.fetchingOldPartsError = false;
        state.oldParts = handlePartsResponse(action.payload.bids, false);
      })
      .addCase(actions.fetchOldParts.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    // All Parts
    builder
      .addCase(actions.fetchAllParts.pending, (state, action) => {
        state.fetchingAllParts = true;
        state.fetchingAllPartsError = false;
      })
      .addCase(actions.fetchAllParts.fulfilled, (state, action) => {
        state.fetchingAllParts = false;
        state.fetchingAllPartsError = false;
        state.allParts = handlePartsResponse(action.payload.allBids, false);
      })
      .addCase(actions.fetchAllParts.rejected, (state, action) => {
        state.fetchingAllParts = false;
        state.fetchingAllPartsError = true;
      });

    // Search Parts
    builder
      .addCase(actions.searchParts.pending, (state, action) => {
        state.searchingParts = true;
        state.searchingPartsFailed = false;
      })
      .addCase(actions.searchParts.fulfilled, (state, action) => {
        state.searchingParts = false;
        state.searchingPartsFailed = false;
        state.searchedParts = handleSearchedPartsResponse(
          action.payload.newParts,
          action.payload.oldParts,
          action.payload.allParts,
        );
      })
      .addCase(actions.searchParts.rejected, (state, action: any) => {
        state.searchingParts = false;
        state.searchingPartsFailed = true;
        ToastService.error(
          'Sign up',
          action?.payload?.error
            ? action.payload.error
            : 'Something went wrong',
        );
      });

    // Send Quotation
    builder
      .addCase(actions.sendQuotation.pending, (state, action) => {
        state.creatingQuotation = true;
        state.creatingQuotationSuccess = false;
        state.creatingQuotationFailure = false;
      })
      .addCase(actions.sendQuotation.fulfilled, (state, action) => {
        state.creatingQuotation = false;
        state.creatingQuotationSuccess = true;
        state.creatingQuotationFailure = false;
      })
      .addCase(actions.sendQuotation.rejected, (state, action) => {
        state.creatingQuotation = false;
        state.creatingQuotationSuccess = false;
        state.creatingQuotationFailure = true;
      });

    // Bid detail
    builder
      .addCase(actions.fetchBidDetail.pending, (state, action) => {
        state.fetchingBidDetail = true;
        state.fetchingBidDetailSuccess = false;
        state.fetchingBidDetailError = false;
      })
      .addCase(actions.fetchBidDetail.fulfilled, (state, action) => {
        state.fetchingBidDetail = false;
        state.fetchingBidDetailSuccess = true;
        state.fetchingBidDetailError = false;
        state.bidDetail = action.payload.bid;
      })
      .addCase(actions.fetchBidDetail.rejected, (state, action: any) => {
        state.fetchingBidDetail = false;
        state.fetchingBidDetailSuccess = false;
        state.fetchingBidDetailError = true;
        ToastService.error(
          'Request Detail',
          action?.payload?.error
            ? action.payload.error
            : 'Something went wrong',
        );
      });
  },
});

export default partsSlice;
