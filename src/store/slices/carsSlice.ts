import {createSlice} from '@reduxjs/toolkit';
import CarCardProps from '../../models/carCard';
import actions from '../actions';
import constants from '../../utils/constants';
import ToastService from '../../Services/ToastService';
import {Alert} from 'react-native';

const initialState = {
  fetching: true,
  error: false,
  addingCar: false,
  addingCarError: false,
  addCarSuccess: false,
  data: <any>[],
};

function handleCarsResponse(cars: any): CarCardProps[] {
  return cars.map((car: any, index: number) => ({
    id: car._id,
    brandId: car.brand._id,
    brandName: car.brand.name,
    makeId: car.model._id,
    makeName: car.model.name,
    year: car.manufacturingYear,
    imageUrl: car.images.length > 0 ? `${car.images[0]}` : '',
    carName: car.model.name,
    carMake: `${car.brand.name} | ${car.manufacturingYear}`,
    outOfStock: false,
    selected: false,
  }));
}

const carSlice = createSlice({
  name: 'Cars',
  initialState,
  reducers: {
    resetCreationState: state => {
      state.addCarSuccess = false;
      state.addingCarError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(actions.fetchCars.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchCars.fulfilled, (state, action) => {
        state.data = handleCarsResponse(action.payload.cars);
        state.error = false;
        state.fetching = false;
      })
      .addCase(actions.fetchCars.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    builder
      .addCase(actions.fetchCarsOfUser.pending, (state, action) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(actions.fetchCarsOfUser.fulfilled, (state, action) => {
        state.data = handleCarsResponse(action.payload.cars);
        state.error = false;
        state.fetching = false;
      })
      .addCase(actions.fetchCarsOfUser.rejected, (state, action) => {
        state.fetching = false;
        state.error = true;
      });

    builder
      .addCase(actions.addCar.pending, (state, action) => {
        state.addingCar = true;
        state.addingCarError = false;
        state.addCarSuccess = false;
      })
      .addCase(actions.addCar.fulfilled, (state, action) => {
        state.addingCar = false;
        state.addingCarError = false;
        state.addCarSuccess = true;
      })
      .addCase(actions.addCar.rejected, (state, action: any) => {
        state.addingCar = false;
        state.addingCarError = true;
        // ToastService.error(
        //   'Add Car Error',
        //   action?.error?.message ? action.error.message : 'Adding car failed',
        // );
        ToastService.error(
          'Add Car Error',
          action?.payload?.message
            ? action.payload.message
            : 'Adding car failed',
        );
        state.addCarSuccess = false;
      });
  },
});

export default carSlice;
