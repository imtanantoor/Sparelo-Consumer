import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";

function ApprovedOrders() {
  return <OrdersHistoryList filterStatus={dataConstants.orderStatus.APPROVED} />
}

export default ApprovedOrders