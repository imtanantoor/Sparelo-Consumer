import { useEffect, useState } from "react";
import { FlatList, FlatListProps, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddToGarageButtonSVG from "../../assets/AddToGarageButton";
import EngineIcon from "../../assets/icons/EngineIcon";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CarCard from "../molecular/CarCard";
import CategoryCard from "../molecular/CategoryCard";
import Section from "./Section";
import CarCardProps from "../../models/carCard";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import CategoryCardProps from "../../models/categoryCard";
import constants from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "../global/CustomImage";
import FastImage from "react-native-fast-image";

interface GarageListProps {
  sectionActionPress: (props?: any) => any
  title: string
  addToGaragePress: (props?: any) => any
  cars: CarCardProps[]
  fetchingCars: boolean,
  fetchingCarsError: boolean,
  categories: CategoryCardProps[],
  fetchingCategories: boolean,
  fetchingCategoriesError: boolean,
  reload: boolean,
  verticalList: boolean
  user: UserModel,
  fetchCarsOfUser: (id: string | number) => void,
  fetchCategories: () => void
}

interface AddToGarageProps {
  onPress: (props?: any) => any
}

function AddToGarageButton({ onPress }: AddToGarageProps): JSX.Element {
  return <TouchableOpacity activeOpacity={0.9} style={styles.addToGarageCardContainer} onPress={onPress}>
    <CustomImage
      isStatic
      source={require('../../assets/AddCarToGarage.jpeg')}
      style={{ height: 90, width: 90 }}
      resizeMode={FastImage.resizeMode.contain}
      imageUrl=""
    />
    {/* <AddToGarageButtonSVG /> */}
    <Text style={styles.addToGarageText}>Add Car to Garage</Text>
  </TouchableOpacity>
}

function ItemSeparatorComponent(): JSX.Element {
  return <View style={{ marginHorizontal: 15 }} />
}
function SubListItemSeparator(): JSX.Element {
  return <View style={{ marginHorizontal: 7.5 }} />
}

function GarageList({ title, cars, categories, fetchingCars, fetchingCarsError, verticalList = false, fetchingCategories, fetchingCategoriesError, user, reload, sectionActionPress, addToGaragePress, fetchCategories, fetchCarsOfUser }: GarageListProps): JSX.Element {
  const [selectedCar, setSelectedCar] = useState<CarCardProps | null>(null)
  const navigation: any = useNavigation()
  function handleCarPress(item: CarCardProps) {
    return () => {
      if ((selectedCar == null || selectedCar?.id !== item.id) && item.outOfStock === false)
        setSelectedCar(item)
      else
        setSelectedCar(null)

      if (item?.onPress)
        item?.onPress()
    }
  }

  useEffect(() => {
    fetchCarsOfUser(user._id)
    fetchCategories()
  }, [reload])

  return <View style={styles.parentView}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={cars}
      numColumns={verticalList ? 2 : 0}
      horizontal={cars?.length > 0 && !verticalList}
      scrollEnabled={selectedCar == null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={cars?.length > 0 ? <AddToGarageButton onPress={addToGaragePress} /> : null}
      ListEmptyComponent={<Section
        sectionDescription="You have currently no vehicles in your garage. Add to your garage."
        type="primary"
        title="Add To Your Garage"
        submitting={false}
        disabled={false}
        onPress={sectionActionPress}
      />}
      contentContainerStyle={{ paddingHorizontal: 20, justifyContent: 'space-between' }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={({ item }) => (<CarCard
        key={item.id}
        {...item}
        onPress={handleCarPress(item)}
        isVertical={verticalList}

        selected={selectedCar && selectedCar.id === item.id ? true : false}
      />
      )}
    />
    {selectedCar && categories.length > 0 && < FlatList
      data={categories}
      horizontal
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={SubListItemSeparator}
      renderItem={({ item }) => (<CategoryCard
        {...item}
        onPress={() => {
          navigation.navigate('FindYourParts', {
            screen: 'Filter', params: {
              brandId: selectedCar.brandId,
              brandName: selectedCar.brandName,
              modelId: selectedCar.makeId,
              modelName: selectedCar.makeName,
              manufacturingYear: selectedCar.year,
              carId: selectedCar.id,
              categoryId: item.id,
              categoryName: item.title,
              buttonsDisabled: true
            }
          })
        }}
      />)}
    />}
  </View>
}

const styles = StyleSheet.create({
  parentView: {
    // height: 250,
  },
  addToGarageCardContainer: {
    padding: 10,
    height: 200,
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginRight: 15,
    elevation: 3,
  },
  plusButton: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    backgroundColor: colors.primary
  },
  addToGarageText: {
    textAlign: 'center',
    fontSize: font.sizes.input,
    color: colors.lightGray,
    marginVertical: 10,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular
  },
  title: {
    color: '#1E2022',
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.fourteen
  }
})
const mapStateToProps = (state: any) => ({
  cars: state.Cars.data,
  fetchingCars: state.Cars.loading,
  fetchingCarsError: state.Cars.error,
  categories: state.Categories.data,
  fetchingCategories: state.Categories.fetching,
  fetchingCategoriesError: state.Categories.error,
  reload: state.Cars.addCarSuccess,
  user: state.Auth.user
})
const mapDispatchToProps = {
  fetchCarsOfUser: actions.fetchCarsOfUser,
  fetchCategories: actions.fetchCategories,
}
export default connect(mapStateToProps, mapDispatchToProps)(GarageList)