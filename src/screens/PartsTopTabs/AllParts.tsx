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
  fetchAllParts: (requestId: string | number) => void
  route: any
}

function AllParts({ fetching, error, data, fetchAllParts, route }: NewPartsProps): JSX.Element {
  const requestId: string | number = route.params.requestId

  useEffect(() => {
    fetchAllParts(requestId)
  }, [])

  return <FlatList
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      error={error}
      onPress={() => { }}
    />}
    style={{ flex: 1, backgroundColor: colors.white }}
    data={data}
    renderItem={({ item, index }: any) => {
      return <PartsCard {...item} />
    }}
  />
}

const mapStateToProps = (state: any) => ({
  data: state.Parts.allParts,
  fetching: state.Parts.fetchingAllParts,
  error: state.Parts.fetchingAllPartsError
})

const mapDispatchToProps = {
  fetchAllParts: actions.fetchAllParts
}

export default connect(mapStateToProps, mapDispatchToProps)(AllParts)