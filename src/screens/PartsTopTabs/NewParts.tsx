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
  user: UserModel
  error: boolean
  data: PartsCardModel[]
  orderCreated: boolean
  fetchNewParts: ({ requestId, status, userId }: { requestId: string | number, status: string, userId: string }) => void
  route: any
}

function NewParts({ fetching, error, data, user, fetchNewParts, route, orderCreated }: NewPartsProps): JSX.Element {
  const requestId: string | number = route.params.requestId
  const status: string = route.params.status

  useEffect(() => { }, [data.length])

  useEffect(() => {
    fetchNewParts({ requestId, status, userId: user._id })
  }, [orderCreated])

  useEffect(() => { }, [data.length])

  return <FlatList
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      error={error}
      onPress={() => { }}
    />}
    style={{ flex: 1, backgroundColor: colors.white }}
    data={data}
    renderItem={({ item, index }: any) => <PartsCard {...item} checkAvailability={route.params.checkAvailability} />}
  />
}

const mapStateToProps = (state: any) => ({
  user: state.Auth.user,
  data: state.Parts.newParts,
  fetching: state.Parts.fetching,
  error: state.Parts.error,
  orderCreated: state.Orders.orderCreated
})

const mapDispatchToProps = {
  fetchNewParts: actions.fetchNewParts
}

export default connect(mapStateToProps, mapDispatchToProps)(NewParts)