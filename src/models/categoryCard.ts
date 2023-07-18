interface CategoryCardProps {
  id: number;
  title: string;
  onPress: (props?: any) => any;
  // Icon: JSX.Element;
  image: string;
  style?: any;
  selected?: boolean;
}

export default CategoryCardProps;
