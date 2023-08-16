import Modal from "react-native-modal";
import colors from "../../constants/colors";
import { Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import constants from "../../utils/constants";
import { useState } from "react";
import ToastService from "../../Services/ToastService";
import cancelOrderPayload from "../../models/cancelOrderModel";
import ordersSlice from "../../store/slices/ordersSlice";
import { useDispatch } from "react-redux";

function CancelOrderModal({ visible, orderId, hideModal }: { visible: boolean, orderId: string, hideModal: () => void }): JSX.Element {
  const [reason, setReason] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const dispatch = useDispatch()

  async function cancelOrder() {
    setSubmitting(true)
    dispatch(ordersSlice.actions.setRefetchHistory(false))

    const data: cancelOrderPayload = {
      id: orderId.toString(),
      cancelledBy: 'Buyer',
      reasonOfCancellation: reason
    }
    try {
      const response = await constants.apiInstance.patch('orders/cancelOrder', data)
      if (response.status === 200 || response.status == 201) {
        ToastService.success('Cancel Order', response.data.message)
        dispatch(ordersSlice.actions.setRefetchHistory(true))
        hideModal()
      }
      setSubmitting(false)

    } catch (error: any) {
      setSubmitting(false)
      ToastService.error('Cancel Order', error?.response?.message)
    }
  }


  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={{ backgroundColor: colors.white, padding: 15, borderRadius: 10 }}>
      <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold, fontSize: font.sizes.subtitle }}>Reason</Text>

      <View >
        <TextInput
          placeholder="Please feel free to share your reason"
          multiline
          onChangeText={(value: string) => setReason(value)}
          style={{ borderColor: '#E3E4E6', marginVertical: 20, borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, minHeight: 100 }}
        />
        <CustomButton
          title="Proceed"
          onPress={cancelOrder}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={submitting}
          submitting={submitting}
        />
      </View>
    </View>
  </Modal>
}

export default CancelOrderModal