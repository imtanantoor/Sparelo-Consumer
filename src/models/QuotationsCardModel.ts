interface QuotationsCardModel {
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
  showDeleteButton?: boolean;
  deletingQuotation?: boolean;
  offeredBy: string;
  onDeletePress?: (id: string) => void;
}

export default QuotationsCardModel;
