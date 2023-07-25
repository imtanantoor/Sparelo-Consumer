import {createSlice} from '@reduxjs/toolkit';
import BrandCardProps from '../../models/brandCard';
import actions from '../actions';
import constants from '../../utils/constants';

const initialState: {
  fetching: boolean;
  error: boolean;
  data: BrandCardProps[];
} = {
  fetching: true,
  error: false,
  data: [],
};

function handleBrandsResponse(brands: any): BrandCardProps[] {
  return brands.map((brand: any) => ({
    id: brand._id,
    imageUrl: brand.image ? brand.image : '',
    title: brand.name,
  }));
}

const brandsSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(actions.fetchBrands.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchBrands.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleBrandsResponse(action.payload.brands);
      })
      .addCase(actions.fetchBrands.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    // search by query
    builder
      .addCase(actions.searchBrands.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.searchBrands.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.data = handleBrandsResponse(action.payload.brands);
      })
      .addCase(actions.searchBrands.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });
  },
});

export default brandsSlice;
