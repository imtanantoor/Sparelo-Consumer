import { FlatList, RefreshControl } from "react-native";
import AvailabilityCard from "../../../components/organism/AvailabilityCard";
import { connect } from "react-redux";
import actions from "../../../store/actions";
import AvailabilityCardModel from "../../../models/AvailabilityCardsModel";
import ListEmptyComponent from "../../../components/global/ListEmptyComponent";
import { useEffect } from "react";
import ChangeAvailabilityStatusModel from "../../../models/ChangeAvailabilityStatusModel";
import availabilitySlice from "../../../store/slices/availabilitySlice";

interface AvailabilityHomeProps {
  data: AvailabilityCardModel[]
  fetching: boolean
  error: boolean
  user: UserModel
  mode: any
  changingStatus: boolean
  changeStatusSuccess: boolean
  changeStatusError: boolean
  fetchAllAvailableItemsOfUser: (userId: string) => void
  changeAvailability: (data: ChangeAvailabilityStatusModel) => void
  resetChangingState: () => void
}

function AvailabilityHome({ data, fetching, error, user, mode, changingStatus, changeStatusSuccess, changeStatusError, fetchAllAvailableItemsOfUser, changeAvailability, resetChangingState }: AvailabilityHomeProps): JSX.Element {

  useEffect(() => {
    if (data.length == 0 || changeStatusSuccess)
      fetchAllAvailableItemsOfUser(user._id)

    if (changeStatusSuccess) {
      resetChangingState()
    }
  }, [changeStatusSuccess])

  function handleApiCall() {
    fetchAllAvailableItemsOfUser(user._id)
  }

  function handleAvailabilityStatus(data: ChangeAvailabilityStatusModel) {
    changeAvailability(data)
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
      mode={mode}
      handleAvailabilityStatus={handleAvailabilityStatus}
      submitting={changingStatus}
    />}
  />
}

const mapStateToProps = (state: any) => ({
  data: state.Availability.data,
  fetching: state.Availability.fetching,
  error: state.Availability.error,
  changingStatus: state.Availability.changingStatus,
  changeStatusSuccess: state.Availability.changeStatusSuccess,
  changeStatusError: state.Availability.changeStatusError,
  user: state.Auth.user,
  mode: state.Auth.mode
})

const mapDispatchToProps = {
  fetchAllAvailableItemsOfUser: actions.fetchAllAvailableItemsOfUser,
  changeAvailability: actions.changeAvailability,
  resetChangingState: availabilitySlice.actions.resetChangingState
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityHome)