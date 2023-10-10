interface CarCardProps {
  id: number;
  brandId: string | number;
  brandName: string;
  makeName: string;
  makeId: string | number;
  year: number;
  imageUrl: string;
  carName: string;
  carMake: string;
  isVertical: boolean;
  outOfStock: boolean;
  selected: boolean;
  onPress: (props?: any) => any;
}

export default CarCardProps;
