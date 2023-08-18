import { useNavigation } from "@react-navigation/native";
import OrdersHistoryList from "../../components/organism/OrdersHistoryList";
import dataConstants from "../../constants/dataConstants";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";

function CompletedOrders() {

  return <OrdersHistoryList filterStatus={dataConstants.orderStatus.COMPLETED} />
}

export default CompletedOrders