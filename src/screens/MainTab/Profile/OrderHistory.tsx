import { SafeAreaView, Text } from "react-native";
import OrdersHistoryList from "../../../components/organism/OrdersHistoryList";

function OrderHistory() {
  return <SafeAreaView style={{ flex: 1 }}>
    <OrdersHistoryList />
  </SafeAreaView>
}

export default OrderHistory