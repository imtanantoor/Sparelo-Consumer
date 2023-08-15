interface AvailabilityCardModel {
  id: string | number;
  bid: string | number;
  images: string[];
  make: string;
  model: string;
  year: string;
  price: string | number;
  isNew: boolean;
  available: boolean;
  quantity: number;
  rating: number;
  offeredBy: string;
  availibilityStatus: string;
  audioNote?: string;
}

export default AvailabilityCardModel;
