import { useDebugValue, useLayoutEffect, useState } from "react"
import font from "../../constants/fonts"
import { SafeAreaView, View } from "react-native"
import HeaderBack from "../../components/molecular/HeaderBack"
import CartList from "../../components/organism/CartList"
import CustomTextInput from "../../components/global/CustomTextInput"
import CustomButton from "../../components/global/CustomButton"
import CustomModal from "../../components/organism/CustomModal"
import OrderSuccessfull from "../../assets/OrderSuccessfull"
import { StackActions } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import cartSlice from "../../store/slices/cartSlice"
import constants from "../../utils/constants"
import { CartCardProps } from "../../components/global/CartCard"
import { CartDataModel } from "../../models/cartModel"
import ToastService from "../../Services/ToastService"

function OrderSummary({ navigation, route }: any): JSX.Element {
  const { data } = useSelector((state: any) => state.Cart)
  const [modalVisible, setModalVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { address, initialRegion } = route.params;
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
      headerBackVisible: false,
      headerTitleStyle: {
        color: '#3C3A35',
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular
      }
    })
  }, [])

  function hideModal() {
    setModalVisible(false)
  }

  function handleBackToHome() {
    navigation.dispatch(StackActions.popToTop())
    dispatch(cartSlice.actions.reset())
    setModalVisible(false)
  }

  async function handleSubmit() {
    setSubmitting(true)

    const payload = {
      address,
      orderBy: constants.ownerId,
      items: data.map((cart: CartDataModel) => ({ request: cart.id, bid: cart.bid }))
    }

    try {
      const { data, status } = await constants.apiInstance.post('orders/create', payload)
      if (status == 200) {
        dispatch(cartSlice.actions.reset())
      }
      setModalVisible(true)
      setSubmitting(false)

    } catch (error: any) {
      ToastService.error('Create Order', error?.message ? error.message : 'Could not create order!')
      setSubmitting(false)
    }
  }

  return <SafeAreaView>
    <CartList />
    <View style={{ marginHorizontal: 20 }}>
      <CustomTextInput
        label="My address"
        disabled
        touched={{}}
        errors={{}}
        setTouched={() => { }}
        onChange={() => { }}
        placeholder="My address"
        value={address}
        fieldName="address"
        required={false}
        onBlur={() => { }}
      />
      <CustomButton
        title="Continue"
        disabled={submitting}
        submitting={submitting}
        type="primary"
        buttonStyle={{ alignSelf: 'flex-end', width: '100%' }}
        onPress={handleSubmit}
      />
      <CustomModal
        visible={modalVisible}
        title="Order Successfull"
        description="Your order has been placed successfully"
        hideModal={hideModal}
        Component={() => <OrderSuccessfull />}
        showButton
        buttonTitle="Back to Home screen"
        buttonStyle={{ padding: 10, alignSelf: 'flex-end', width: '100%' }}
        onButtonPress={handleBackToHome}
      />
    </View>
  </SafeAreaView>
}

export default OrderSummary