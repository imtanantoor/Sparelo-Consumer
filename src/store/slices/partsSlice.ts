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

function handlePartsResponse(requests: any): PartsCardModel[] {
  let data: PartsCardModel[] = [];
  // if (requests.length > 0)
  //   requests.forEach((request: any, index: number) => {
  //     if (request?.bids && request?.bids?.length > 0) {
  //       data = request?.bids?.map((bid: any) => ({
  //         id: request?._id,
  //         bid: bid?._id,
  //         images:
  //           request?.images && request?.images?.length > 0
  //             ? request?.images.map(
  //                 (image: string) => constants.baseURL + image,
  //               )
  //             : [],
  //         make: request?.brand?.name ? request?.brand?.name : 'make',
  //         model: request?.model?.name ? request?.model?.name : 'model',
  //         year: request?.manufacturingYear
  //           ? request?.manufacturingYear
  //           : 'year',
  //         price: bid?.price ? bid?.price : '',
  //         audioNote: request?.bids[index]?.voiceNote
  //           ? request.bids[index].voiceNote
  //           : '',
  //         quantity: request?.quantity,
  //         rating: request.user.rating,
  //       }));
  //     }
  //   });

  return requests.map((bid: any, index: number) => ({
    id: bid.request._id,
    bid: bid?._id,
    images: bid?.request?.images.map(
      (image: string) => constants.baseURL + image,
    ),
    make: bid?.request?.model?.name ? bid?.request?.model?.name : 'make',
    model: bid?.request?.model?.name ? bid?.request?.model?.name : 'model',
    year: bid?.request?.manufacturingYear
      ? bid?.request?.manufacturingYear
      : 'year',
    price: bid?.price ? bid?.price : '',
    audioNote: bid?.request?.voiceNote ? bid.request.voiceNote : '',
    quantity: bid.request.quantity,
    rating: bid?.user?.rating ? bid.user.rating : 3,
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
