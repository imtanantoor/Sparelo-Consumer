import {createSlice} from '@reduxjs/toolkit';
import AdsItemModel from '../../models/AdItemModel';
import actions from '../actions';
import ToastService from '../../Services/ToastService';
import {Slide} from '../../components/organism/AdsSlider';

interface AdsSlice {
  fetching: boolean;
  error: boolean;
  success: boolean;
  data: Slide[];
}

const initialState: AdsSlice = {
  fetching: false,
  error: false,
  success: false,
  data: [],
};

function handleAdsResponse(ads: AdsItemModel[]): Slide[] {
  return ads.map((item: AdsItemModel) => ({imageUrl: item.image}));
}

const adsSlice = createSlice({
  name: 'Ads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(actions.fetchAds.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
        state.success = false;
      })
      .addCase(actions.fetchAds.fulfilled, (state, action) => {
        state.fetching = false;
        state.error = false;
        state.success = true;
        state.data = handleAdsResponse(action?.payload?.ads);
      })
      .addCase(actions.fetchAds.rejected, (state, action: any) => {
        state.fetching = false;
        state.error = true;
        state.success = false;
        ToastService.error(
          'Sign up',
          action?.payload?.error
            ? action.payload.error
            : action?.payload?.message
            ? action.payload.message
            : 'Something went wrong',
        );
      });
  },
});

export default adsSlice;
