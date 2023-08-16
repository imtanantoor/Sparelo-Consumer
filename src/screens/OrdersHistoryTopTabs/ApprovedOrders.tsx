import { useNavigation } from "@react-navigation/native";
import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";

function ApprovedOrders() {
  const navigation: any = useNavigation()
  const { mode } = useSelector((state: any) => state.Auth)

  useLayoutEffect(() => {
    if (mode === 'buyer') {
      navigation.setOptions({
        title: 'Completed Orders'
      })
    }
  }, [])

  return <OrdersHistoryList filterStatus={mode == 'buyer' ? dataConstants.orderStatus.COMPLETED : dataConstants.orderStatus.APPROVED} />
}

export default ApprovedOrders