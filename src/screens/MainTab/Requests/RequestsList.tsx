import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import { useEffect, useLayoutEffect } from "react";
import colors from "../../../constants/colors";
import RequestsCard from "../../../components/organism/RequestsCard";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import RequestsListProps from "../../../models/requestsList";
import ListEmptyComponent from "../../../components/global/ListEmptyComponent";
import RequestCardProps from "../../../models/requestCard";

function RequestsList({ navigation, route, requests, fetching, error, mode, user, fetchRequests, fetchRequestsOfVendor }: RequestsListProps): JSX.Element {

  useEffect(() => {
    if (mode === 'buyer')
      return fetchRequests(user._id)

    fetchRequestsOfVendor(user._id)
  }, [])

  function handleApiCall() {
    if (mode === 'buyer')
      return fetchRequests(user._id)

    fetchRequestsOfVendor(user._id)
  }

  function handleItemPress(item: RequestCardProps) {

    if (mode === 'buyer')
      return navigation.navigate('Quotations', { requestId: item.id })

    return navigation.navigate('Send Quotation', { requestId: item.id })
    // ToastService.warning('Vendor', 'Quotations integration work in progress')

  }

  return <FlatList
    style={{ backgroundColor: colors.white, flex: 1 }}
    data={requests}
    refreshControl={<RefreshControl refreshing={fetching} onRefresh={handleApiCall} />}
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      onPress={handleApiCall}
      error={error} />}
    renderItem={({ item, index }) => <RequestsCard
      id={item.id}
      imageBackground={item.imageBackground}
      category={item.category}
      make={item.make}
      images={item.images}
      model={item.model}
      year={item.year}
      buttonTitle={item.buttonTitle}
      buttonDisabled={item.buttonDisabled}
      onButtonPress={() => handleItemPress(item)}
    />}
  />
}


const mapStateToProps = (state: any) => ({
  requests: state.Requests.data,
  fetching: state.Requests.fetching,
  error: state.Requests.error,
  user: state.Auth.user,
  mode: state.Auth.mode
})

const mapDispatchToProps = {
  fetchRequests: actions.fetchRequestsOfUser,
  fetchRequestsOfVendor: actions.fetchRequestsOfVendor
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList)