import {createAsyncThunk} from '@reduxjs/toolkit';
import constants from '../../utils/constants';
import AddCarModel from '../../models/addCarModel';
import {Alert, Platform} from 'react-native';
import SearchPartsBody from '../../models/searchPartsBody';
import CreateRequestPayload from '../../models/createRequestPayload';
import FormData from 'form-data';
import CreateShopModel from '../../models/CreateShopModel';
import CreateQuotationModel from '../../models/createQuotationModel';
import UpdateShopModel from '../../models/UpdateShopModel';
import ChangeAvailabilityStatusModel from '../../models/ChangeAvailabilityStatusModel';
import cancelOrderPayload from '../../models/cancelOrderModel';
import ToastService from '../../Services/ToastService';
import store from '..';

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
const fetchRequestsOfVendor = createAsyncThunk(
  'Requests/fetchVendorRequests',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `requests/getByVendor/${userId}`,
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
    let brandSearch = '';
    brand.forEach((value: any, index: number) => {
      if (brandSearch === '') {
        brandSearch += value.id;
      } else {
        brandSearch = brandSearch + `&brand=${value.id}`;
      }
    });

    const response = await constants.apiInstance.get(
      `models/search?brand=${brandSearch}&name=${search}`,
    );
    return response.data;
  },
);
const fetchNewParts = createAsyncThunk(
  'Parts/fetchNewParts',
  async ({requestId, status}: {requestId: string | number; status: string}) => {
    const response = await constants.apiInstance.get(
      `bids/getNewBids/${requestId}${!!status ? `?status=${status}` : ''}`,
    );
    return response.data;
  },
);
const fetchOldParts = createAsyncThunk(
  'Parts/fetchOldParts',
  async ({requestId, status}: {requestId: string | number; status: string}) => {
    const response = await constants.apiInstance.get(
      `bids/getOldBids/${requestId}${!!status ? `?status=${status}` : ''}`,
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
const fetchAllAvailableItemsOfUser = createAsyncThunk(
  'Availability/fetchAll',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `availability/getAllAvailibilityRequests/${userId}`,
    );
    return response.data;
  },
);
const fetchAllManufacturers = createAsyncThunk(
  'Manufacturers/Get All',
  async () => {
    const response = await constants.apiInstance.get('manufacturer');
    return response.data;
  },
);
const checkAvailability = createAsyncThunk(
  'Availability/Check Availability',
  async (data: CheckAvailability) => {
    const response = await constants.apiInstance.post(
      `availability/checkAvailibility`,
      data,
    );

    return response.data;
  },
);
const fetchPendingQuotations = createAsyncThunk(
  'Quotations/fetchPending',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `bids/getPendingBids/${userId}`,
    );
    return response.data;
  },
);
const fetchCancelledQuotations = createAsyncThunk(
  'Quotations/fetchCancelled',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `bids/getCancelledBids/${userId}`,
    );
    return response.data;
  },
);
const fetchApprovedQuotations = createAsyncThunk(
  'Quotations/fetchApproved',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `bids/getApprovedBids/${userId}`,
    );
    return response.data;
  },
);
const fetchShop = createAsyncThunk(
  'Auth/Fetch Shop Details',
  async (userId: string) => {
    const response = await constants.apiInstance.get(
      `shop/getByUser/${userId}`,
    );
    return response.data;
  },
);
const fetchOrdersHistory = createAsyncThunk(
  'Orders/fetch History',
  async (userId: string) => {
    const response = constants.apiInstance.get(`orders/getByUser/${userId}`);
    return (await response).data;
  },
);

const fetchVendorsOrderHistory = createAsyncThunk(
  'Orders/fetch Vendor Order History',
  async (userId: string) => {
    const response = constants.apiInstance.get(`orders/getByVendor/${userId}`);
    return (await response).data;
  },
);
const fetchAds = createAsyncThunk(
  'Ads/fetch Ads',
  async (undefined, {rejectWithValue}) => {
    try {
      const response = constants.apiInstance.get(`ads`);
      return (await response).data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const createFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (
      key !== 'images' &&
      key !== 'profilePic' &&
      key !== 'voiceNote' &&
      key !== 'coordinates'
    ) {
      if (Array.isArray(data[key])) {
        data[key].forEach((value: any) => {
          formData.append(`${key}[]`, value);
        });
      } else formData.append(key, data[key]);
    }
  });

  if (data.voiceNote) {
    // let fileExt = data?.voiceNote?.split('/Caches/')[1]?.split('.')[1]
    //   ? data?.voiceNote?.split('/Caches/')[1]?.split('.')[1]
    //   : '.aac';
    let fileExt = '.aac';
    let fileName = data?.voiceNote?.split('/Caches/')[1]
      ? data?.voiceNote.split('/Caches/')[1].replace('.m4a', '.aac')
      : `note${fileExt}`;

    formData.append('voiceNote', {
      name: fileName,
      path: data.voiceNote,
      type: fileExt ? `audio/${fileExt}` : 'audio/aac',
      filename: fileName,
      uri: data.voiceNote,
    });
  }

  if (data.coordinates) {
    data.coordinates.map((cord: string) =>
      formData.append('coordinates', cord),
    );
  }

  if (data.profilePic) {
    formData.append('profilePic', {
      name: data.profilePic.fileName,
      path: data.profilePic.uri,
      type: data.profilePic.type,
      uri: data.profilePic.uri,
      filename: data.profilePic.fileName,
    });
  }

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
  } /* else formData.append('images', '') */

  return formData;
};

const fetchRequestDetail = createAsyncThunk(
  'Requests / Fetch Detail',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.get(`requests/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const fetchBidDetail = createAsyncThunk(
  'Bid / Fetch Detail',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.get(`bids/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

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

const addCar = createAsyncThunk(
  'Cars/Add Car',
  async (data: AddCarModel, {rejectWithValue}) => {
    try {
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
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const signUpUser = createAsyncThunk(
  'Auth/SignUp',
  async (data: SignUpUserModel, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.post('users/signup', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const searchParts = createAsyncThunk(
  'Parts/SearchParts',
  async (payload: SearchPartsBody, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.post(
        'requests/searchForRequests',
        payload,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const updateFCMToken = async ({
  userId,
  fcmToken,
}: {
  userId: string;
  fcmToken: string;
}) => {
  try {
    const response = await constants.apiInstance.patch('/users/update', {
      id: userId,
      fcmToken,
    });
    console.log(response.data);
  } catch (error: any) {
    ToastService.error('Token updation', 'failed to update notification token');
  }
};

const loginUser = createAsyncThunk(
  'Auth/Login',
  async (data: LoginPayloadModel, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.post('/users/login', {
        contact: data.contact,
        password: data.password,
      });

      if (response.status === 200 || response.status === 201) {
        const {_id} = response.data.user;
        updateFCMToken({userId: _id, fcmToken: data.fcmToken});
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const updateUser = createAsyncThunk(
  'Auth/Update User',
  async (data: UpdateUserModel) => {
    const resposne = await constants.apiInstance.patch(
      'users/update',
      createFormData(data),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return resposne.data;
  },
);

const createShop = createAsyncThunk(
  'Auth/Create Shop',
  async (data: CreateShopModel) => {
    const response = await constants.apiInstance.post(
      'shop/create',
      createFormData(data),
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    return response.data;
  },
);

const sendQuotation = createAsyncThunk(
  'Requests/Send Quotation',
  async (data: CreateQuotationModel) => {
    const response = await constants.apiInstance.post(
      'bids/create',
      createFormData(data),
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    return response.data;
  },
);

const changeAvailability = createAsyncThunk(
  'Availability/ Change Availability Status',
  async (data: ChangeAvailabilityStatusModel, {rejectWithValue}) => {
    try {
      const resposne = await constants.apiInstance.post(
        'availability/changeAvailibilityStatus',
        data,
      );
      return resposne;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const changePassword = createAsyncThunk(
  'Auth / Change Password',
  async (data: ChangePasswordModel, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.post(
        'users/changePassword',
        data,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.error);
    }
  },
);

// UPDATE REQUESTS
const updateShop = createAsyncThunk(
  'Auth/ Update Shop',
  async (data: UpdateShopModel, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.patch(
        'shop/update',
        createFormData(data),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
const approveOrder = createAsyncThunk(
  'Orders/Approve Order',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.patch(
        `orders/approvedOrder/${id}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const cancelOrder = createAsyncThunk(
  'Orders/Cancel Order',
  async (data: cancelOrderPayload, {rejectWithValue}) => {
    try {
      const response = await constants.apiInstance.patch(
        `orders/cancelOrder`,
        data,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

// DELETE REQUESTS
const deleteQuotation = createAsyncThunk(
  'Quotation/Delete Quotation',
  async (id: string) => {
    const response = await constants.apiInstance.delete(`bids/${id}`);
    return response.data;
  },
);

const actions = {
  fetchCars,
  fetchCarsOfUser,
  fetchCategories,
  fetchRequests,
  fetchRequestsOfUser,
  fetchRequestsOfVendor,
  fetchBrands,
  fetchModels,
  fetchNewParts,
  fetchOldParts,
  fetchAllParts,
  fetchAllAvailableItemsOfUser,
  fetchAllManufacturers,
  fetchCancelledQuotations,
  fetchPendingQuotations,
  fetchApprovedQuotations,
  fetchOrdersHistory,
  fetchVendorsOrderHistory,
  fetchShop,
  fetchAds,
  searchParts,
  searchBrands,
  searchModelsOfBrand,
  searchModels,
  addCar,
  createRequest,
  checkAvailability,
  changeAvailability,
  changePassword,
  signUpUser,
  loginUser,
  updateUser,
  createShop,
  updateShop,
  sendQuotation,
  deleteQuotation,
  approveOrder,
  cancelOrder,
  fetchRequestDetail,
  fetchBidDetail,
};

export default actions;
