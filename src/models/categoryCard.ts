interface CategoryCardProps {
  id: number;
  title: string;
  onPress: (props?: any) => any;
  // Icon: JSX.Element;
  image: string;
  hideImage?: boolean;
  style?: any;
  numberOfLines?: number;
  selected?: boolean;
}

export default CategoryCardProps;
