interface PartsCardModel {
  id: string | number;
  bid: string | number;
  images: string[];
  make: string;
  model: string;
  year: string;
  price: string | number;
  quantity: number;
  audioNote?: any;
  rating: number;
}

export default PartsCardModel;
