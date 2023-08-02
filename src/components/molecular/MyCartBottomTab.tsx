import { StyleSheet, View } from "react-native";
import CartIcon from "../../assets/icons/CartIcon";
import colors from "../../constants/colors";
import { useSelector } from "react-redux";

function MyCartBottomTab({ focused, color, hideBage }: any): JSX.Element {
  const { data } = useSelector((state: any) => state.Cart)
  return <View>
    <CartIcon stroke={focused ? colors.activeTabIconColor : color} />
    {data.length > 0 && !!hideBage == false && <View style={styles.badge} />}
  </View>
}

const styles = StyleSheet.create({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
    position: 'absolute',
    right: -5,
    top: -5
  }
})

export default MyCartBottomTab