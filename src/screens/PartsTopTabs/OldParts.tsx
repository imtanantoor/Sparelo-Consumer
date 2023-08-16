import { FlatList, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import PartsCard from "../../components/organism/PartsCard";
import ListEmptyComponent from "../../components/global/ListEmptyComponent";
import dataConstants from "../../constants/dataConstants";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { useEffect } from "react";
import PartsCardModel from "../../models/partsCard";

interface NewPartsProps {
  fetching: boolean
  error: boolean
  data: PartsCardModel[]
  fetchOldParts: (requestId: string | number) => void
  route: any
  orderCreated: boolean
}

function OldParts({ fetching, error, data, fetchOldParts, route, orderCreated }: NewPartsProps): JSX.Element {
  const requestId: string | number = route.params.requestId

  useEffect(() => {
    fetchOldParts(requestId)
  }, [orderCreated])

  return <FlatList
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      error={error}
      onPress={() => { }}
    />}
    style={{ flex: 1, backgroundColor: colors.white }}
    data={data}
    renderItem={({ item, index }: any) => <PartsCard {...item} />}
  />
}

const mapStateToProps = (state: any) => ({
  data: state.Parts.oldParts,
  fetching: state.Parts.fetchingOldParts,
  error: state.Parts.fetchingOldPartsError,
  orderCreated: state.Orders.orderCreated
})

const mapDispatchToProps = {
  fetchOldParts: actions.fetchOldParts
}

export default connect(mapStateToProps, mapDispatchToProps)(OldParts)