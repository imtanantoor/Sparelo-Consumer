import { StyleSheet, TouchableOpacity } from "react-native";
import CartIcon from "../../assets/icons/CartIcon";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";
import { View } from "react-native";

function CartButton({ navigation }: any): JSX.Element {
  const { data } = useSelector((state: any) => state.Cart)

  return <TouchableOpacity
    style={{ paddingHorizontal: 20 }}
    onPress={() => navigation.navigate('My Cart')}
  >
    <CartIcon />
    {data.length > 0 && <View style={styles.badge} />}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
    position: 'absolute',
    right: 15,
    top: -5
  }
})

export default CartButton