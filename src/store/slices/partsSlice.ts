import {createSlice} from '@reduxjs/toolkit';
import PartsCardModel from '../../models/partsCard';
import actions from '../actions';
import constants from '../../utils/constants';

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
  newParts: PartsCardModel[];
  oldParts: PartsCardModel[];
  allParts: PartsCardModel[];
  searchedParts: {
    newParts: PartsCardModel[];
    oldParts: PartsCardModel[];
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
  newParts: [],
  oldParts: [],
  allParts: [],
  searchedParts: {
    newParts: [],
    oldParts: [],
  },
};

function handleSearchedPartsResponse(newPartsData: any[], oldPartsData: any[]) {
  let newParts = handlePartsResponse(newPartsData, true);
  let oldParts = handlePartsResponse(oldPartsData, true);

  return {
    newParts,
    oldParts,
  };
}

function handlePartsResponse(bids: any, isSearch: boolean): PartsCardModel[] {
  if (isSearch)
    return bids.map((part: any, index: number) => ({
      id: part?._id,
      bid: part?.bids[index]?._id ? part?.bids[index]?._id : 0,
      images: part?.images.map((image: string) => constants.baseURL + image),
      make: part?.model?.name ? part?.model?.name : 'make',
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
    images: bid?.request?.images.map(
      (image: string) => constants.baseURL + image,
    ),
    make: bid?.request?.model?.name ? bid?.request?.model?.name : 'make',
    model: bid?.request?.model?.name ? bid?.request?.model?.name : 'model',
    year: bid?.manufacturingYear ? bid?.manufacturingYear : 'year',
    price: bid?.price,
    audioNote: bid?.request?.voiceNote ? bid?.request?.voiceNote : '',
    quantity: bid?.quantity,
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
        );
      })
      .addCase(actions.searchParts.rejected, (state, action) => {
        state.searchingParts = false;
        state.searchingPartsFailed = true;
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
  },
});

export default partsSlice;
