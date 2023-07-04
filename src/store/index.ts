import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import carSlice from './slices/carsSlice';
import categoriesSlice from './slices/categoriesSlice';
import requestsSlice from './slices/requestsSlice';
import brandsSlice from './slices/brandsSlice';
import cartSlice from './slices/cartSlice';
import modelsSlice from './slices/modelSlice';
import partsSlice from './slices/partsSlice';
import availabilitySlice from './slices/availabilitySlice';
import manufacturerSlice from './slices/manufacturerSlice';

const rootReducer = combineReducers({
  Auth: authSlice.reducer,
  Availability: availabilitySlice.reducer,
  Brands: brandsSlice.reducer,
  Cart: cartSlice.reducer,
  Cars: carSlice.reducer,
  Categories: categoriesSlice.reducer,
  Models: modelsSlice.reducer,
  Manufacturers: manufacturerSlice.reducer,
  Requests: requestsSlice.reducer,
  Parts: partsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
