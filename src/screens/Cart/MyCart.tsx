import { useLayoutEffect } from "react"
import font from "../../constants/fonts"
import { Text, View } from "react-native"
import { StyleSheet } from "react-native"
import colors from "../../constants/colors"
import CustomButton from "../../components/global/CustomButton"
import CartList from "../../components/organism/CartList"
import { useSelector } from "react-redux"
import constants from "../../utils/constants"

function MyCart({ navigation }: any): JSX.Element {
  const { total, data } = useSelector((state: any) => state.Cart)


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerTitleStyle: {
        ...constants.headerTitleStyle
        // fontFamily: font.fontFamilies({ type: 'Inter' }).regular
      }
    })
  }, [])

  function handleCheckout() {
    navigation.navigate('Delivery Address')
  }

  return <View style={styles.mainContainer}>
    <CartList />
    {data.length > 0 && <View style={styles.listFooter}>
      <View>
        <Text style={styles.priceHeading}>Total Price:</Text>
        <Text style={styles.price}>Rs.{total}</Text>
      </View>
      <CustomButton
        title="Checkout"
        disabled={false}
        type='primary'
        submitting={false}
        buttonStyle={{ padding: 15 }}
        onPress={handleCheckout}
      />
    </View>}
  </View>
}

export default MyCart

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    backgroundColor: colors.white,
    padding: 0,
    margin: 0
  },
  listFooter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
    borderTopColor: 'rgba(216, 216, 216, 0.3)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceHeading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: 'rgba(38, 38, 38, 0.5)',
    fontSize: font.sizes.fourteen
  },
  price: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
    fontSize: 20
  }
})