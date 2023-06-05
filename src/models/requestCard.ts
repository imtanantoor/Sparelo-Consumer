interface RequestCardProps {
  id: number;
  category: string;
  make: string;
  model: string;
  year: string;
  imageBackground: string;
  buttonDisabled: boolean;
  buttonTitle: string;
  onButtonPress: (props?: any) => any;
}

export default RequestCardProps;
