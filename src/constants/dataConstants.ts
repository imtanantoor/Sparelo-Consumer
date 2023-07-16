import PartsCardModel from '../models/partsCard';
import colors from './colors';

const dummyImages = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
];

enum orderStatus {
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  CONFIRMED = 'confirmed',
}

enum orderStatusTextColor {
  cancelled = '#D00606',
  pending = '#262626',
  approved = '#04b347',
  confirmed = '#04b347',
}

const dataConstants: any = {
  dummyImages,
  orderStatus,
  orderStatusTextColor,
};

export default dataConstants;
