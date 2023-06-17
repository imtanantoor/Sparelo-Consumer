import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonWithIconProps extends TouchableOpacityProps {
  Icon: (props?: any) => JSX.Element,
}

function ButtonWithIcon({ Icon, ...rest }: ButtonWithIconProps): JSX.Element {
  return <TouchableOpacity {...rest}>
    <Icon />
  </TouchableOpacity>
}

export default ButtonWithIcon

