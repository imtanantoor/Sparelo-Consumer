import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";

function CancelledOrders() {
  return <OrdersHistoryList filterStatus={dataConstants.orderStatus.CANCELLED} />
}

export default CancelledOrders