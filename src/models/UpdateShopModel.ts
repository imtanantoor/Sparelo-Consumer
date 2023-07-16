interface UpdateShopModel {
  id: string;
  name: string;
  coordinates: [string, string];
  address: string;
  category: string;
  brand: string;
  model: string;
  user: string;
  images?: any;
}

export default UpdateShopModel;
