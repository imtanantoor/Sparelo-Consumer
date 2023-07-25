import {createSlice} from '@reduxjs/toolkit';
import actions from '../actions';
import constants from '../../utils/constants';

const initialState = {
  fetching: true,
  error: false,
  data: [],
};

function handleCategoriesResponse(categories: any) {
  return categories.map((category: any) => ({
    id: category._id,
    title: category.name,
    image: category.image ? category.image : '',
  }));
}

const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actions.fetchCategories.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchCategories.fulfilled, (state, action) => {
        state.fetching = false;
        state.data = handleCategoriesResponse(action.payload.categories);
      })
      .addCase(actions.fetchCategories.rejected, (state, action) => {
        state.error = true;
        state.fetching = false;
      }),
});

export default categoriesSlice;
