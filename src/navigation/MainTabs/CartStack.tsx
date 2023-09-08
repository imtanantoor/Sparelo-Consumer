import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DummyScreen from "../../screens/DummyScreen"
import CartList from "../../components/organism/CartList"
import DeliveryAddress from "../../screens/Cart/DeliveryAddress"
import colors from "../../constants/colors"
import OrderSummary from "../../screens/Cart/OrderSummary"
import MyCart from "../../screens/Cart/MyCart"
import font from "../../constants/fonts"

const Stack = createNativeStackNavigator()

function CartStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{
    headerTitleStyle: {
      color: '#3C3A35',
      fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold
    },
    contentStyle: { backgroundColor: colors.white },
  }}>
    <Stack.Screen name="My Cart" component={MyCart} />
    <Stack.Screen name="Delivery Address" component={DeliveryAddress} />
    <Stack.Screen name="Order Summary" component={OrderSummary} />
  </Stack.Navigator>
}

export default CartStack