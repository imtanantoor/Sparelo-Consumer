import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import ListEmptyComponent from "../../components/global/ListEmptyComponent";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { useEffect } from "react";
import PartsCardModel from "../../models/partsCard";
import SearchPartsBody from "../../models/searchPartsBody";
import AvailabilityCard from "../../components/organism/AvailabilityCard";
import { useNavigation } from "@react-navigation/native";

interface SearchPartsProps {
  fetching: boolean
  error: boolean
  newParts: PartsCardModel[]
  oldParts: PartsCardModel[]
  searchParts: (data: SearchPartsBody) => void
  route: any
  user: UserModel
}

function SearchPartsTab({ fetching, error, newParts, user, oldParts, searchParts, route }: SearchPartsProps): JSX.Element {
  const { category, brand, model, manufacturingYear, itemInPair, type } = route.params
  const navigation: any = useNavigation()

  const payload: SearchPartsBody = {
    category: category.id ? category.id : "646d623a7fe12f003ac34ebb",
    brand: brand.id ? brand.id : "646517a3bec729d8efdbb903",
    model: model.id ? model.id : "64656de2bec729d8efdbb907",
    manufacturingYear: manufacturingYear ? Number(manufacturingYear) : 2013,
    itemInPair: true,
    user: user._id
  }

  useEffect(() => {
    searchParts(payload)
  }, [])

  return <FlatList
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      error={error}
      height={Dimensions.get('screen').height * 0.5}
      onPress={() => searchParts(payload)}
    />}
    style={{ flex: 1, backgroundColor: colors.white }}
    data={type == 'new' ? newParts : oldParts}
    renderItem={({ item, index }: any) => <AvailabilityCard
      {...item}
      type='results'
      onButtonPress={() => navigation.navigate('Results', { ...route.params, requestId: item.id, checkAvailability: true })}
      buttonTitle={`${item.quantity} Bids`}
    />}
  />
}

const mapStateToProps = (state: any) => ({
  newParts: state.Parts.searchedParts.newParts,
  oldParts: state.Parts.searchedParts.oldParts,
  fetching: state.Parts.searchingParts,
  error: state.Parts.searchingPartsFailed,
  user: state.Auth.user
})

const mapDispatchToProps = {
  searchParts: actions.searchParts
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPartsTab)