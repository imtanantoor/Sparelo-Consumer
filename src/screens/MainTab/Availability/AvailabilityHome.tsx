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
  user: UserModel
}

function AvailabilityHome({ data, fetching, error, user, fetchAllAvailableItemsOfUser }: AvailabilityHomeProps): JSX.Element {

  useEffect(() => {
    fetchAllAvailableItemsOfUser(user._id)
  }, [])

  function handleApiCall() {
    fetchAllAvailableItemsOfUser(user._id)
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
  error: state.Availability.error,
  user: state.Auth.user
})

const mapDispatchToProps = {
  fetchAllAvailableItemsOfUser: actions.fetchAllAvailableItemsOfUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityHome)