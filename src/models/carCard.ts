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
  outOfStock: boolean;
  selected: boolean;
  onPress: (props?: any) => any;
}

export default CarCardProps;
