import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import constants from '../../utils/constants';

const initialState = {
  fetching: false,
  error: false,
  data: [],
};

function handleModelsResponse(models: any) {
  return models.map((model: any) => ({
    id: model._id,
    title: model.name,
    image: model.image ? constants.baseURL + model.brand.image : '',
  }));
}

const modelsSlice = createSlice({
  name: 'Models',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(actions.fetchModels.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchModels.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleModelsResponse(action.payload.models);
      })
      .addCase(actions.fetchModels.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    // search models by query
    builder
      .addCase(actions.searchModels.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.searchModels.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleModelsResponse(action.payload.models);
      })
      .addCase(actions.searchModels.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });
    //search models of a brand and query
    builder
      .addCase(actions.searchModelsOfBrand.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.searchModelsOfBrand.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleModelsResponse(action.payload.models);
      })
      .addCase(actions.searchModelsOfBrand.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });
  },
});

export default modelsSlice;
