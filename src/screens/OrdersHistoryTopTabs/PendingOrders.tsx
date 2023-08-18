import { useSelector } from "react-redux";
import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

function PendingOrders() {
  const { mode } = useSelector((state: any) => state.Auth)
  const navigation: any = useNavigation()

  useLayoutEffect(() => {
    if (mode === 'vendor') {
      navigation.setOptions({
        title: 'Pending Delivery'
      })
    }
  }, [])
  return <OrdersHistoryList filterStatus={dataConstants.orderStatus.CONFIRMED} />
}

export default PendingOrders