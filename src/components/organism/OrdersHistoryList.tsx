import { FlatList, RefreshControl, Text, View } from "react-native";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { useEffect } from "react";
import ListEmptyComponent from "../global/ListEmptyComponent";
import OrderHistoryCardProps from "../../models/orderHistoryCardProps";
import OrderHistoryCard from "./OrderHistoryCard";

interface OrdersHistoryListProps {
  data: OrderHistoryCardProps[]
  fetching: boolean
  error: boolean
  user: UserModel
  fetchOrdersHistory: (userId: string) => void
}

function OrdersHistoryList({ data, fetching, user, error, fetchOrdersHistory }: OrdersHistoryListProps) {

  useEffect(() => {
    fetchOrdersHistory(user._id)
  }, [])

  function handleApiCall() {
    if (!fetching)
      fetchOrdersHistory(user._id)
  }

  return <FlatList
    data={data}
    refreshControl={<RefreshControl refreshing={fetching} onRefresh={handleApiCall} />}
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      onPress={handleApiCall}
      error={error} />}
    renderItem={({ item }) => <OrderHistoryCard {...item} />}
  />
}

const mapStateToProps = (state: any) => ({
  data: state.Orders.ordersHistory,
  fetching: state.Orders.fetchingOrdersHistory,
  error: state.Orders.fetchingOrdersHistoryError,
  user: state.Auth.user
})

const mapDispatchToProps = {
  fetchOrdersHistory: actions.fetchOrdersHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistoryList)