import {createAsyncThunk} from '@reduxjs/toolkit';
import constants from '../../utils/constants';
import AddCarModel from '../../models/addCarModel';
import {Alert, Platform} from 'react-native';
import SearchPartsBody from '../../models/searchPartsBody';
import CreateRequestPayload from '../../models/createRequestPayload';
import FormData from 'form-data';

const fetchCategories = createAsyncThunk('Categories/fetchAll', async () => {
  const response = await constants.apiInstance.get('categories');
  return response.data;
});
const fetchCars = createAsyncThunk('Cars/fetchAll', async () => {
  const response = await constants.apiInstance.get('cars');
  return response.data;
});
const fetchCarsOfUser = createAsyncThunk(
  'Cars/fetchCarsOfUser',
  async (userId: string | number) => {
    const response = await constants.apiInstance.get(
      `cars/getByUser/${userId}`,
    );
    return response.data;
  },
);
const fetchRequests = createAsyncThunk('Requests/fetchAll', async () => {
  const response = await constants.apiInstance.get('requests');
  return response.data;
});
const fetchRequestsOfUser = createAsyncThunk(
  'Requests/fetchUserRequests',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `requests/getByUser/${userId}`,
    );

    return response.data;
  },
);
const fetchBrands = createAsyncThunk('Brands/fetchAll', async () => {
  const response = await constants.apiInstance.get('brands');
  return response.data;
});
const fetchModels = createAsyncThunk('Models/fetchAll', async () => {
  const response = await constants.apiInstance.get('models');
  return response.data;
});
const searchBrands = createAsyncThunk(
  'Brands/searchBrands',
  async (search: string) => {
    const response = await constants.apiInstance.get(
      `brands/search?q=${search}`,
    );
    return response.data;
  },
);
const searchModels = createAsyncThunk(
  'Models/searchModels',
  async (search: string) => {
    const response = await constants.apiInstance.get(
      `models/search?name=${search}`,
    );
    return response.data;
  },
);
const searchModelsOfBrand = createAsyncThunk(
  'Models/searchModelsOfBrand',
  async (payload: any) => {
    const {brand, search} = payload;
    const response = await constants.apiInstance.get(
      `models/search?brand=${brand}&name=${search}`,
    );
    return response.data;
  },
);
const fetchNewParts = createAsyncThunk(
  'Parts/fetchNewParts',
  async (requestId: string | number) => {
    const response = await constants.apiInstance.get(
      `bids/getNewBids/${requestId}`,
    );
    return response.data;
  },
);
const fetchOldParts = createAsyncThunk(
  'Parts/fetchOldParts',
  async (requestId: string | number) => {
    const response = await constants.apiInstance.get(
      `bids/getOldBids/${requestId}`,
    );
    return response.data;
  },
);
const fetchAllParts = createAsyncThunk(
  'Parts/fetchAllParts',
  async (requestId: string | number) => {
    const response = await constants.apiInstance.get(
      `bids/getAllBids/${requestId}`,
    );
    return response.data;
  },
);
const searchParts = createAsyncThunk(
  'Parts/SearchParts',
  async (payload: SearchPartsBody) => {
    const response = await constants.apiInstance.post(
      'requests/searchForRequests',
      payload,
    );
    return response.data;
  },
);
const fetchAllAvailableItemsOfUser = createAsyncThunk(
  'Availability/fetchAll',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `bids/getAllAvailibilityRequests/${userId}`,
    );
    return response.data;
  },
);
const checkAvailability = createAsyncThunk(
  'Availability/Check Availability',
  async (bidId: string | number) => {
    const response = await constants.apiInstance.get(
      `bids/checkAvailibility/${bidId}`,
    );

    return response.data;
  },
);

const createFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (key !== 'images') {
      formData.append(key, data[key]);
    }
  });

  if (data.images && data.images.length > 0) {
    data.images.forEach((photo: any) => {
      formData.append('images', {
        name: photo.fileName,
        path: photo.uri,
        type: photo.type,
        uri: photo.uri,
        filename: photo.fileName,
      });
    });
  } else formData.append('images', '');

  return formData;
};

// POST REQUESTS
const createRequest = createAsyncThunk(
  'Requests/Create Request',
  async (data: CreateRequestPayload) => {
    const response = await constants.apiInstance.post(
      'requests/create',
      createFormData(data),
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    return response.data;
  },
);

const addCar = createAsyncThunk('Cars/Add Car', async (data: AddCarModel) => {
  const response = await constants.apiInstance.post(
    'cars/create',
    createFormData(data),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
});

const actions = {
  fetchCars,
  fetchCarsOfUser,
  fetchCategories,
  fetchRequests,
  fetchRequestsOfUser,
  fetchBrands,
  fetchModels,
  fetchNewParts,
  fetchOldParts,
  fetchAllParts,
  fetchAllAvailableItemsOfUser,
  searchParts,
  searchBrands,
  searchModelsOfBrand,
  searchModels,
  addCar,
  createRequest,
  checkAvailability,
};

export default actions;
