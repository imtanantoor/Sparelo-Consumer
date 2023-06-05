import { FlatList, RefreshControl } from "react-native";
import AvailabilityCard from "../../../components/organism/AvailabilityCard";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import AvailabilityCardModel from "../../../models/AvailabilityCardsModel";
import ListEmptyComponent from "../../../components/global/ListEmptyComponent";
import { useEffect } from "react";

interface AvailabilityHomeProps {
  data: AvailabilityCardModel[]
  fetching: boolean
  error: boolean
  fetchAllAvailableItemsOfUser: (userId: string) => void
}

function AvailabilityHome({ data, fetching, error, fetchAllAvailableItemsOfUser }: AvailabilityHomeProps): JSX.Element {

  useEffect(() => {
    fetchAllAvailableItemsOfUser('64656e68bec729d8efdbb90a')
  }, [])

  function handleApiCall() {
    fetchAllAvailableItemsOfUser('64656e68bec729d8efdbb90a')
  }

  return <FlatList
    refreshControl={<RefreshControl refreshing={fetching} onRefresh={handleApiCall} />}
    data={data}
    ListEmptyComponent={() => <ListEmptyComponent
      fetching={fetching}
      error={error}
      onPress={handleApiCall}
    />}
    renderItem={({ item, index }) => <AvailabilityCard
      {...item}
    />}
  />
}

const mapStateToProps = (state: any) => ({
  data: state.Availability.data,
  fetching: state.Availability.fetching,
  error: state.Availability.error
})

const mapDispatchToProps = {
  fetchAllAvailableItemsOfUser: actions.fetchAllAvailableItemsOfUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityHome)