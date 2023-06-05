interface CreateRequestPayload {
  images: string[];
  category: string | number;
  car: string | number;
  user: string | number;
  itemInPair: boolean;
  quantity: number;
  additionalNotes: string;
  voiceNote: any;
}

export default CreateRequestPayload;
