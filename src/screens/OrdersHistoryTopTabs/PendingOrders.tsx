import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";

function PendingOrders() {
  return <OrdersHistoryList filterStatus={dataConstants.orderStatus.PENDING} />
}

export default PendingOrders