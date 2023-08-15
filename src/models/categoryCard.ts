interface CategoryCardProps {
  id: number;
  title: string;
  onPress: (props?: any) => any;
  // Icon: JSX.Element;
  image: string;
  hideImage?: boolean;
  style?: any;
  selected?: boolean;
}

export default CategoryCardProps;
