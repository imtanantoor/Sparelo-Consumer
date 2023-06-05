import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, FlatList, View, SafeAreaView, StyleSheet, Text } from "react-native";
import CustomButton from "../../../../components/global/CustomButton";
import CustomSearchInput from "../../../../components/global/CustomSearchInput";
import BrandCard from "../../../../components/molecular/BrandCard";
import CategoryCard from "../../../../components/molecular/CategoryCard";
import colors from "../../../../constants/colors";
import font from "../../../../constants/fonts";
import { connect, useSelector } from "react-redux";
import actions from "../../../../store/actions";
import CategoryCardProps from "../../../../models/categoryCard";
import { useNavigation } from "@react-navigation/native";
import BrandCardProps from "../../../../models/brandCard";
import { debounce } from "lodash";
import ListEmptyComponent from "../../../../components/global/ListEmptyComponent";

interface SearchScreenProps {
  categories: CategoryCardProps[]
  brands: BrandCardProps[]
  models: any[]
  fetchingCategoriesError: boolean
  fetchingCategories: boolean
  fetchingBrandsError: boolean
  fetchingBrands: boolean
  fetchingModels: boolean
  fetchingModelsError: boolean
  navigation: any
  route: any
  fetchCategories: () => void
  fetchBrands: () => void
  fetchModels: () => void
  searchModels: ({ search, brand }: { search: string, brand: string | number }) => void
  searchBrands: (text: string) => void
}


interface SearchListProps {
  type: string
  categories: CategoryCardProps[]
  brands: BrandCardProps[]
  models: any[]
  values: any,
  setValues: (props?: any) => void
}

function SearchList({ type, categories, brands, models, values, setValues }: SearchListProps): JSX.Element {
  const navigation = useNavigation()
  const { fetchingBrands, fetchingBrandsError, fetchingCategories, fetchingCategoriesError, fetchingModels, fetchingModelsError } = useSelector((state: any) => ({
    fetchingCategoriesError: state.Categories.error,
    fetchingCategories: state.Categories.fetching,
    fetchingBrandsError: state.Brands.error,
    fetchingBrands: state.Brands.fetching,
    fetchingModels: state.Models.fetching,
    fetchingModelsError: state.Models.error
  }))

  function handleOnPress(name: string, value: any) {
    return () => {
      setValues({
        ...values, [name]: {
          id: value.id, name: value.title
        }
      })
      navigation.goBack()
    }
  }

  if (type === 'Brand')
    return <FlatList
      data={brands}
      numColumns={3}
      style={{ maxHeight: '70%' }}
      ListEmptyComponent={() => <ListEmptyComponent height={Dimensions.get('window').height * 0.5} fetching={fetchingBrands} error={fetchingBrandsError} hideButton onPress={() => { }} />}
      renderItem={({ item }) => <BrandCard
        title={item.title}
        imageUrl={item.imageUrl}
        onPress={handleOnPress('brand', item)}
        style={{ width: '30.333%', marginRight: 5, marginLeft: 3 }}
      />}
    />

  if (type === 'Model')
    return <FlatList
      data={models}
      numColumns={3}
      style={{ maxHeight: '70%' }}
      ListEmptyComponent={() => <ListEmptyComponent
        height={Dimensions.get('window').height * 0.5}
        fetching={fetchingModels} error={fetchingModelsError} hideButton onPress={() => { }} />}
      renderItem={({ item }) => <CategoryCard
        title={item.title}
        image={item.image}
        id={item.id}
        onPress={handleOnPress('model', item)}
        style={{ width: '30.333%', marginRight: 5, marginLeft: 3 }}
      />}
    />
  return <FlatList
    data={categories}
    numColumns={3}
    contentContainerStyle={{ height: '70%', }}
    style={{ maxHeight: '70%' }}
    ListEmptyComponent={() => <ListEmptyComponent
      height={Dimensions.get('window').height * 0.5}
      fetching={fetchingCategories} error={fetchingCategoriesError} hideButton onPress={() => { }} />}
    renderItem={({ item }) => <CategoryCard
      title={item.title}
      image={item.image}
      id={item.id}
      onPress={handleOnPress('category', item)}
      style={{ width: '30.333%', marginRight: 5, marginLeft: 3 }}
    />}
  />
}

function Search({ route, navigation, categories, brands,
  models,
  fetchingModels,
  fetchingModelsError,
  fetchingCategories,
  fetchingCategoriesError,
  fetchingBrands,
  fetchingBrandsError,
  fetchCategories,
  fetchBrands,
  fetchModels,
  searchBrands,
  searchModels }: SearchScreenProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')
  const { params }: any = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.title
    })
  }, [])

  useEffect(() => {
    if (params.title === 'Category')
      fetchCategories()
    if (params.title === 'Model')
      searchModels({ search: '', brand: params.values.brand.id })
    // fetchModels()
    if (params.title === 'Brand')
      fetchBrands()

  }, [])

  function handleSearch(query: string) {
    if (params.title === 'Category') {
      fetchCategories()
    }

    if (params.title === 'Model') {
      // if (!!query) {
      searchModels({ search: query, brand: params.values.brand.id })
      // } else
      // fetchModels()
    }
    if (params.title === 'Brand') {
      if (!!query) {
        searchBrands(query)
      } else
        fetchBrands()
    }
  }

  const handler = useCallback(debounce(handleSearch, 1000), [])

  function handleInput(text: string) {
    setSearchValue(text)
    handler(text)
  }

  return <SafeAreaView style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between' }} >
    <View style={styles.container}>
      <CustomSearchInput
        placeholder={`Search ${params?.title.toLowerCase()}`}
        onChangeText={handleInput}
        value={searchValue}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Result</Text>
      </View>
      <SearchList
        type={params?.title ?? 'categories'}
        categories={categories}
        brands={brands}
        models={models}
        values={params.values}
        setValues={params.setValues}
      />
    </View>
    <CustomButton
      title="Done"
      type="primary"
      onPress={() => { }}
      buttonStyle={{ marginHorizontal: 20 }}
      disabled={false}
      submitting={false}
    />
  </SafeAreaView >
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  headerContainer: {
    paddingVertical: 5,
    borderBottomColor: colors.red,
    borderBottomWidth: 1,
    // marginVertical: 25
  },
  headerText: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.subtitle
  }
})

const mapStateToProps = (state: any) => ({
  categories: state.Categories.data,
  brands: state.Brands.data,
  models: state.Models.data,
  fetchingCategoriesError: state.Categories.error,
  fetchingCategories: state.Categories.fetching,
  fetchingBrandsError: state.Brands.error,
  fetchingBrands: state.Brands.fetching,
  fetchingModels: state.Models.fetching,
  fetchingModelsError: state.Models.error

})

const mapDispatchToProps = {
  fetchCategories: actions.fetchCategories,
  fetchBrands: actions.fetchBrands,
  fetchModels: actions.fetchModels,
  searchBrands: actions.searchBrands,
  searchModels: actions.searchModelsOfBrand
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)