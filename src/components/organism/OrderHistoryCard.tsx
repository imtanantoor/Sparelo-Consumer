import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import CustomImage from "../global/CustomImage";
import OrderHistoryCardProps from "../../models/orderHistoryCardProps";
import font from "../../constants/fonts";
import dataConstants from "../../constants/dataConstants";
import { Fragment, useState } from "react";
import CustomButton from "../global/CustomButton";
import ConfrimOrderModal from "./ConfirmOrderModal";
import CancelOrderModal from "./CancelOrderModal";

function OrderHistoryCard({ images, make, model, year, category, requestedBy, orderStatus, approveOrder, cancelOrder, changingStatus = false, changingStatusType = '', mode, id, sellerId }: OrderHistoryCardProps) {
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false)
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)

  function openCompleteModal() {
    setShowCompleteModal(true)
  }

  function openCancelModal() {
    setShowCancelModal(true)
  }

  function hideCompleteModal() {
    setShowCompleteModal(false)
  }

  function hideCancelModal() {
    setShowCancelModal(false)
  }

  return <View style={styles.container}>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <CustomImage
        imageUrl={images?.[0] ? images[0] : ''}
        source={{ uri: '' }}
        style={{ height: 55, width: 55 }}
      />
      <View style={styles.rightSection}>
        <Text style={styles.heading}>{category}</Text>
        <View>
          <Text style={styles.description}>{make ? `${make} |` : ''} {model ? `${model} |` : ''} {year ? `${year} |` : ''}</Text>
        </View>
        <Text style={{
          fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
          marginVertical: 10,
          textTransform: 'uppercase',
          color: dataConstants.orderStatusTextColor[orderStatus.toLowerCase()],
        }}>{mode === 'buyer' && orderStatus.toLowerCase() === 'approved' ? 'COMPLETED' : orderStatus}
        </Text>
      </View>
    </View>
    {orderStatus?.toLowerCase() === 'confirmed' && mode === 'vendor' &&
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomButton
          title="Cancel"
          onPress={cancelOrder ? () => cancelOrder({ id, cancelledBy: 'Seller' }) : () => { }}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%', backgroundColor: colors.white, borderColor: colors.red, borderWidth: 1 }}
          titleStyle={{ fontSize: 12, color: colors.red }}
          disabled={changingStatus}
          submitting={changingStatus && changingStatusType === 'cancel'}
        />
        <CustomButton
          title="Approve"
          onPress={approveOrder ? () => approveOrder(id) : () => { }}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={changingStatus}
          submitting={changingStatus && changingStatusType === 'approve'}
        />
      </View>
    }
    {orderStatus?.toLowerCase() === 'confirmed' && mode === 'buyer' &&
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomButton
          title="Cancel"
          onPress={openCancelModal}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%', backgroundColor: colors.white, borderColor: colors.red, borderWidth: 1 }}
          titleStyle={{ fontSize: 12, color: colors.red }}
          disabled={changingStatus}
          submitting={changingStatus && changingStatusType === 'cancel'}
        />
        <CustomButton
          title="Complete"
          onPress={openCompleteModal}
          type='primary'
          buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={changingStatus}
          submitting={changingStatus && changingStatusType === 'approve'}
        />
      </View>
    }
    <ConfrimOrderModal
      visible={showCompleteModal}
      sellerId={sellerId}
      orderId={id}
      hideModal={hideCompleteModal}
    />
    <CancelOrderModal
      visible={showCancelModal}
      orderId={id}
      hideModal={hideCancelModal}
    />
  </View>
}

export default OrderHistoryCard

const styles = StyleSheet.create({
  container: {
    padding: 10, shadowColor: "#000",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rightSection: {
    paddingHorizontal: 20,
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: '#262626'
  },
  heading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.fourteen,
    marginBottom: 5
  },
})