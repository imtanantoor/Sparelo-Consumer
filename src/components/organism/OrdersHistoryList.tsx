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
  mode: 'buyer' | 'vendor'
  fetchOrdersHistory: (userId: string) => void
  fetchVendorsOrderHistory: (userId: string) => void
}

function OrdersHistoryList({ data, fetching, user, error, mode, fetchOrdersHistory, fetchVendorsOrderHistory }: OrdersHistoryListProps) {

  useEffect(() => {
    if (mode === 'vendor')
      fetchVendorsOrderHistory(user._id)
    else
      fetchOrdersHistory(user._id)
  }, [])

  function handleApiCall() {
    if (!fetching) {
      mode === 'vendor' ? fetchVendorsOrderHistory(user._id) : fetchOrdersHistory(user._id)
    }
  }

  return <FlatList
    data={data}
    style={{ flex: 1 }}
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
  mode: state.Auth.mode,
  user: state.Auth.user
})

const mapDispatchToProps = {
  fetchOrdersHistory: actions.fetchOrdersHistory,
  fetchVendorsOrderHistory: actions.fetchVendorsOrderHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistoryList)