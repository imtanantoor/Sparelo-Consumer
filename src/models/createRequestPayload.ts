interface CreateRequestPayload {
  images: string[];
  category: string | number;
  car: string | number;
  brand: string | number;
  model: string | number;
  user: string | number;
  itemInPair: boolean;
  quantity: number;
  manufacturingYear: number;
  additionalNotes: string;
  voiceNote: any;
}

export default CreateRequestPayload;
