import PartsCardModel from '../models/partsCard';

const dummyImages = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
];

const dummyPartsData: PartsCardModel[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: '1999',
    images: dummyImages,
    quantity: 10,
    price: 2500,
    rating: 3,
  },
];

const dataConstants = {
  dummyImages,
  dummyPartsData,
};

export default dataConstants;
