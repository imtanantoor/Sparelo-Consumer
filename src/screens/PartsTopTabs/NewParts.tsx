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
  fetchNewParts: (requestId: string | number) => void
  route: any
}

function NewParts({ fetching, error, data, fetchNewParts, route }: NewPartsProps): JSX.Element {
  const requestId: string | number = route.params.requestId

  useEffect(() => {
    fetchNewParts(requestId)
  }, [])

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
  data: state.Parts.newParts,
  fetching: state.Parts.fetching,
  error: state.Parts.error
})

const mapDispatchToProps = {
  fetchNewParts: actions.fetchNewParts
}

export default connect(mapStateToProps, mapDispatchToProps)(NewParts)