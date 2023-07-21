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
import QuotationsSlice from './slices/quotationsSlice';
import ordersSlice from './slices/ordersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers({
  Auth: authSlice.reducer,
  Availability: availabilitySlice.reducer,
  Brands: brandsSlice.reducer,
  Cart: cartSlice.reducer,
  Cars: carSlice.reducer,
  Categories: categoriesSlice.reducer,
  Models: modelsSlice.reducer,
  Manufacturers: manufacturerSlice.reducer,
  Orders: ordersSlice.reducer,
  Requests: requestsSlice.reducer,
  Parts: partsSlice.reducer,
  Quotations: QuotationsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export default store;
