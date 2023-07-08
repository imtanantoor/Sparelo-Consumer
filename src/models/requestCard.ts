interface RequestCardProps {
  id: number;
  category: string;
  make: string;
  model: string;
  year: string;
  imageBackground: string;
  images: string[];
  buttonDisabled: boolean;
  buttonTitle: string;
  audioNote: string;
  onButtonPress: (props?: any) => any;
}

export default RequestCardProps;
