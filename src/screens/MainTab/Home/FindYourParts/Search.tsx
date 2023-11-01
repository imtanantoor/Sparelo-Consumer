import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, FlatList, View, SafeAreaView, StyleSheet, Text, SectionList } from "react-native";
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
  multiSelect?: boolean
  setModelReset?: (val: boolean) => void
}

function SearchList({ type, categories, brands, models, values, multiSelect = false, setValues, setModelReset }: SearchListProps): JSX.Element {
  const navigation: any = useNavigation()
  const [modelsData, setModelsData] = useState([])
  const [orientation, setOrientation] = useState<string>("PORTRAIT")
  const [categoriesListHeight, setCategoriesListHeight] = useState(Dimensions.get('screen').height * 0.55)
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
      if (multiSelect) {
        let temp = values[name] ? [...values[name]] : []
        let found = temp.findIndex((item: { id: string, name: string }) => item.id == value.id)
        if (found !== -1) {
          navigation.setParams({ values: { ...values, [name]: temp.filter((item: { id: string, name: string }) => item.id !== value.id) } })

          setValues({
            ...values,
            [name]: temp.filter((item: { id: string, name: string }) => item.id !== value.id)
          })
        }
        else {
          temp.push({ ...value })
          navigation.setParams({ values: { ...values, [name]: temp } })
          setValues({
            ...values,
            [name]: temp
          })
        }
      } else {
        if (name === 'brand') {
          if (setModelReset) {
            setModelReset(true)
            setTimeout(() => {
              setModelReset(false)
            }, 200)
          }
        }
        setValues({
          ...values, [name]: {
            id: value.id, name: value.title
          }
        })
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    const listener = (orientation: any) => {
      setOrientation(orientation === "PORTRAIT" ? "LANDSCAPE" : "PORTRAIT")
      setCategoriesListHeight(orientation === "PORTRAIT" ? Dimensions.get('screen').height * 0.3 : Dimensions.get('screen').height * 0.55)
    }
    Dimensions.addEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (multiSelect) {
      let temp: any = []
      values?.brand?.forEach((brand: any) => {
        let obj: any = { title: brand?.title, data: [] }
        models.forEach((model: any) => {
          if (model.brand_id == brand.id) {
            obj.data.push(model)
          }
        })
        temp.push(obj)
      })
      setModelsData(temp)
    }
  }, [models.length])

  if (type === 'Brand')
    return <FlatList
      data={brands}
      numColumns={2}
      style={{ maxHeight: '70%' }}
      ListEmptyComponent={() => <ListEmptyComponent height={Dimensions.get('window').height * 0.5} fetching={fetchingBrands} error={fetchingBrandsError} hideButton onPress={() => { }} />}
      renderItem={({ item }) => <BrandCard
        title={item.title}
        imageUrl={item.imageUrl}
        onPress={handleOnPress('brand', item)}
        selected={multiSelect ? values?.brand?.filter((value: { id: string, title: string }) => value.title == item.title).length > 0 : values?.brand?.name == item.title}
        style={{
          width: '45.333%',
          marginRight: 5,
          marginLeft: 3,
        }}
      />}
    />

  if (type === 'Model') {
    if (multiSelect) {
      return <SectionList
        sections={modelsData}
        style={{ maxHeight: '70%' }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              marginVertical: 15,
            }}>
            <Text style={[styles.headerText, { color: colors.primary }]}>{title}</Text>
          </View>
        )}
        renderSectionFooter={({ section }: any) => {
          if (section?.data?.length == 0) {
            return <View style={{ marginBottom: 10 }}>
              <Text style={[styles.headerText, { fontSize: font.sizes.normal }]}>No data found</Text></View>
          }
          return null
        }}
        ListEmptyComponent={() => <ListEmptyComponent
          height={Dimensions.get('window').height * 0.5}
          fetching={fetchingModels} error={fetchingModelsError} hideButton onPress={() => { }} />
        }
        renderItem={({ item }) => <CategoryCard
          title={item.title}
          key={item.id}
          image={item.image}
          hideImage
          id={item.id}
          onPress={handleOnPress('model', item)}
          selected={multiSelect ? values?.model?.findIndex((value: { id: string, title: string }) => value.title == item.title) !== -1 ? true : false : values?.model?.name == item.title}
          style={{ width: '45.333%', height: 'auto' }}
        />}
      />
    }

    return <FlatList
      data={models}
      numColumns={2}
      style={{ maxHeight: '70%' }}
      ListHeaderComponent={() => <View
        style={{
          marginVertical: 15,
        }}>
        <Text style={[styles.headerText, { color: colors.primary }]}>{values?.brand?.name}</Text>
      </View>}
      ListEmptyComponent={() => <ListEmptyComponent
        height={Dimensions.get('window').height * 0.5}
        fetching={fetchingModels} error={fetchingModelsError} hideButton onPress={() => { }} />}
      renderItem={({ item }) => <CategoryCard
        title={item.title}
        image={item.image}
        hideImage
        id={item.id}
        onPress={handleOnPress('model', item)}
        selected={multiSelect ? values?.model?.findIndex((value: { id: string, title: string }) => value.title == item.title) !== -1 ? true : false : values?.model?.name == item.title}
        style={{ width: '45.333%', marginRight: 5, marginLeft: 3, height: 'auto' }}
      />
      }
    />
  }
  return <FlatList
    data={categories}
    numColumns={2}
    // style={{ maxHeight: '70%', minHeight: '50%' }}
    style={{ height: categoriesListHeight }}
    ListEmptyComponent={() => <ListEmptyComponent
      height={Dimensions.get('window').height * 0.5}
      fetching={fetchingCategories} error={fetchingCategoriesError} hideButton onPress={() => { }} />}
    renderItem={({ item }) => <CategoryCard
      title={item.title}
      image={item.image}
      selected={multiSelect ? values?.category?.findIndex((value: { id: string, title: string }) => value.title == item.title) !== -1 ? true : false : values?.category?.name == item.title}
      id={item.id}
      onPress={handleOnPress('category', item)}
      style={{ width: '45.333%', marginRight: 5, marginLeft: 3, height: 130 }}
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
      searchModels({ search: '', brand: params.multiSelect ? params.values.brand : [{ id: params.values.brand.id }] })
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
        values={route.params.values}
        setModelReset={route.params.setModelReset}
        setValues={route.params.setValues}
        multiSelect={route.params.multiSelect}
      />
    </View>
    <CustomButton
      title="Done"
      type="primary"
      onPress={() => { navigation.goBack() }}
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
    fontFamily: font.fontFamilies({ type: 'Inter' }).medium,
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