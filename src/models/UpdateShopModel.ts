interface UpdateShopModel {
  id: string;
  name: string;
  coordinates: [string, string];
  address: string;
  categories: string[];
  brands: string[];
  models: string[];
  user: string[];
  images?: any;
}

export default UpdateShopModel;
