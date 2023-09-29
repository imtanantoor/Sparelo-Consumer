import Modal from "react-native-modal";
import colors from "../../constants/colors";
import { Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import constants from "../../utils/constants";
import { useState } from "react";
import ToastService from "../../Services/ToastService";
import { useDispatch } from "react-redux";
import ordersSlice from "../../store/slices/ordersSlice";

function ConfrimOrderModal({ visible, sellerId, orderId, hideModal, }: { visible: boolean, sellerId: string, orderId: string, hideModal: () => void }): JSX.Element {
  const [rating, setRating] = useState<number>(0)
  const [ratingStarted, setRatingStarted] = useState<boolean>(false)
  const [updatingRating, setUpdatingRating] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const dispatch = useDispatch()

  async function completeOrder() {
    dispatch(ordersSlice.actions.setRefetchHistory(false))
    // setSubmitting(true)
    try {
      const response = await constants.apiInstance.patch(`orders/completeOrder/${orderId}`)
      if (response.status === 200 || response.status === 201) {
        ToastService.success('Complete Order', 'Order completed successfully')
        dispatch(ordersSlice.actions.setRefetchHistory(true))
        return response.data
      }
      // setSubmitting(false)
    } catch (error: any) {
      ToastService.error('Complete Order', error?.response?.data?.error)
    }
  }

  async function handleUserRating() {
    setUpdatingRating(true)
    try {
      const response = await constants.apiInstance.post('users/rateSeller', { id: sellerId, rating: rating.toString() })

      if (response.status === 200 || response.status == 201) {
        ToastService.success('Rate User', response.data.message)
        hideModal()
        return response.data
      }
      setUpdatingRating(false)
    } catch (error: any) {
      ToastService.error('Rate User', error?.response?.message)
      setUpdatingRating(false)
      setSubmitting(false)
    }
  }

  function handleOrderCompletion() {
    let promises = []
    promises.push(completeOrder())
    if (ratingStarted) {
      promises.push(handleUserRating())
    }
    setSubmitting(true)
    Promise.allSettled(promises).then((values) => {
      console.log({ values })
      setSubmitting(false)
    }).catch((reason) => {
      console.log({ reason })
      setSubmitting(false)
    })
  }

  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={{ backgroundColor: colors.white, padding: 15, borderRadius: 10 }}>
      <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold, fontSize: font.sizes.subtitle }}>Rate Seller</Text>
      <Rating
        startingValue={rating}
        ratingCount={5}
        onStartRating={() => {
          if (!ratingStarted)
            setRatingStarted(true)
        }}
        ratingColor="#EDD011"
        ratingTextColor="red"
        imageSize={30}
        style={{ padding: 0, marginVertical: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}
        onFinishRating={(rating: number) => {
          setRating(rating)
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* <CustomButton
          title="Rate User"
          onPress={handleUserRating}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={updatingRating}
          submitting={updatingRating}
        /> */}
        <CustomButton
          title="Complete"
          onPress={handleOrderCompletion}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, width: '100%',/* minWidth: '48%', */ /* backgroundColor: '#04b347' */backgroundColor: 'green' }}
          titleStyle={{ fontSize: 12 }}
          disabled={submitting}
          submitting={submitting}
        />
      </View>
    </View>
  </Modal>
}

export default ConfrimOrderModal