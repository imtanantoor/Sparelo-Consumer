import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import { useEffect, useLayoutEffect } from "react";
import colors from "../../../constants/colors";
import font from "../../../constants/fonts";
import RequestsCard from "../../../components/organism/RequestsCard";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import RequestsListProps from "../../../models/requestsList";
import ListEmptyComponent from "../../../components/global/ListEmptyComponent";
import constants from "../../../utils/constants";

function RequestsList({ navigation, route, requests, fetching, error, fetchRequests }: RequestsListProps): JSX.Element {

  useEffect(() => {
    fetchRequests(constants.ownerId)
  }, [])

  function handleApiCall() {
    fetchRequests(constants.ownerId)
  }

  return <FlatList
    style={{ backgroundColor: colors.white, flex: 1 }}
    data={requests}
    refreshControl={<RefreshControl refreshing={fetching} onRefresh={handleApiCall} />}
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      onPress={fetchRequests}
      error={error} />}
    renderItem={({ item, index }) => <RequestsCard
      id={item.id}
      imageBackground={item.imageBackground}
      category={item.category}
      make={item.make}
      model={item.model}
      year={item.year}
      buttonTitle={item.buttonTitle}
      buttonDisabled={item.buttonDisabled}
      onButtonPress={() => { navigation.navigate('Quotations', { requestId: item.id }) }}
    />}
  />
}


const mapStateToProps = (state: any) => ({
  requests: state.Requests.data,
  fetching: state.Requests.fetching,
  error: state.Requests.error
})

const mapDispatchToProps = {
  fetchRequests: actions.fetchRequestsOfUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList)