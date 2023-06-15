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
  newParts: [],
  oldParts: [],
  allParts: [],
  searchedParts: {
    newParts: [],
    oldParts: [],
  },
};

function handleSearchedPartsResponse(newPartsData: any[], oldPartsData: any[]) {
  let newParts = handlePartsResponse(newPartsData);
  let oldParts = handlePartsResponse(oldPartsData);

  return {
    newParts,
    oldParts,
  };
}

function handlePartsResponse(parts: any): PartsCardModel[] {
  let data: PartsCardModel[] = [];
  // if (parts.length > 0)
  //   parts.forEach((part: any, index: number) => {
  //     if (part?.bids && part?.bids?.length > 0) {
  //       data = part?.bids?.map((bid: any) => ({
  //         id: part?._id,
  //         bid: bid?._id,
  //         images:
  //           part?.images && part?.images?.length > 0
  //             ? part?.images.map((image: string) => constants.baseURL + image)
  //             : [],
  //         make: part?.brand?.name ? part?.brand?.name : 'make',
  //         model: part?.model?.name ? part?.model?.name : 'model',
  //         year: part?.manufacturingYear ? part?.manufacturingYear : 'year',
  //         price: bid?.price ? bid?.price : '',
  //         audioNote: part?.bids[index]?.voiceNote
  //           ? part.bids[index].voiceNote
  //           : '',
  //         quantity: part?.quantity,
  //         rating: part.user.rating,
  //       }));
  //     }
  //   });

  return parts.map((part: any, index: number) => ({
    id: part?._id,
    bid: part?.bids[index]?._id ? part?.bids[index]?._id : 0,
    images: part?.images.map((image: string) => constants.baseURL + image),
    make: part?.model?.name ? part?.model?.name : 'make',
    model: part?.model?.name ? part?.model?.name : 'model',
    year: part?.manufacturingYear ? part?.manufacturingYear : 'year',
    price: part?.bids[index]?.price ? part?.bids[index]?.price : '',
    audioNote: part?.voiceNote ? part.request.voiceNote : '',
    quantity: part?.bids?.length,
    rating: part?.user?.rating ? part.user.rating : 0,
  }));

  return data;
}

const partsSlice = createSlice({
  name: 'Parts',
  initialState,
  reducers: {},
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
        state.newParts = handlePartsResponse(action.payload.bids);
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
        state.oldParts = handlePartsResponse(action.payload.bids);
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
        state.allParts = handlePartsResponse(action.payload.allBids);
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
  },
});

export default partsSlice;
