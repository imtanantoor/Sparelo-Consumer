import { TouchableOpacity } from "react-native";
import BackIcon from "../../assets/icons/BackIcon";

interface headerBackProps {
  onPress: (props?: any) => any
}

function HeaderBack({ onPress }: headerBackProps): JSX.Element {
  return <TouchableOpacity style={{ paddingRight: 20 }} onPress={onPress}>
    <BackIcon />
  </TouchableOpacity>
}

export default HeaderBack