import {createAsyncThunk} from '@reduxjs/toolkit';
import constants from '../../utils/constants';
import AddCarModel from '../../models/addCarModel';
import {Alert, Platform} from 'react-native';
import SearchPartsBody from '../../models/searchPartsBody';
import CreateRequestPayload from '../../models/createRequestPayload';

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

// POST REQUESTS
const createRequest = createAsyncThunk(
  'Requests/Create Request',
  async (data: CreateRequestPayload) => {
    const formData = new FormData();

    formData.append('category', data.category);
    formData.append('user', data.user);
    formData.append('itemInPair', data.itemInPair);
    formData.append('quantity', data.quantity);
    formData.append('additionalNotes', data.additionalNotes);
    formData.append('voiceNote', data.voiceNote);
    formData.append('car', data.car);

    if (data.images.length > 0) {
      // data.images.forEach((image: any) => {
      //   formData.append('images', {
      //     type: image.type,
      //     name: image.fileName,
      //     path: image.uri,
      //     // path:
      //     //   Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      //   });
      // });
      formData.append(
        'images',
        data.images.map((image: any) => ({
          type: image.type,
          name: image.fileName,
          path: image.uri,
          // path:
          //   Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        })),
      );
    } else formData.append('images', []);

    const response = await constants.apiInstance.post(
      'requests/create',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    return response.data;
  },
);
const addCar = createAsyncThunk('Cars/Add Car', async (data: AddCarModel) => {
  const formData = new FormData();
  formData.append('brand', data.brand);
  formData.append('manufacturingYear', data.manufacturingYear);
  formData.append('model', data.model);
  formData.append('owner', data.owner);

  if (data.images.length > 0) {
    data.images.forEach(async (image: any) => {
      formData.append('images', {
        type: image.type,
        name: image.fileName,
        path: image.uri,
        // path:
        //   Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      });
    });
  } else formData.append('images', []);

  const response = await constants.apiInstance.post('cars/create', formData, {
    headers: {
      // accept: 'application/json',
      // 'cache-control': 'no-cache',
      'Content-Type': 'multipart/form-data',
    },
  });

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
};

export default actions;
