import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomTextInput from "../../components/global/CustomTextInput";
import { useEffect, useRef, useState } from "react";
import LocationSelector from "../../components/organism/LocationSelector";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import LocationServices from "../../Services/LocationServices";
import { Region } from "react-native-maps";
import { View } from "react-native";
import ToastService from "../../Services/ToastService";
import CustomButton from "../../components/global/CustomButton";
import CustomImageSelector from "../../components/global/CustomImageSelector";
import MultipleImageSelector from "../../components/organism/MultipleImageSelector";
import { connect } from "react-redux";
import actions from "../../store/actions";
import CreateShopModel from "../../models/CreateShopModel";
import authSlice from "../../store/slices/authSlice";
import { constant } from "lodash";
import constants from "../../utils/constants";
import UpdateShopModel from "../../models/UpdateShopModel";

type itemType = {
  id: string
  name: string
}
type fieldsType = {
  storeName: string
  location: string
  address: string
  brand: itemType[],
  model: itemType[],
  category: itemType[]
}

const fields: fieldsType = {
  storeName: '',
  location: '',
  address: '',
  brand: [],
  model: [],
  category: []
}

function SelectionButton({ onPress, label, values }: { onPress: (props?: any) => void, label: string, values: itemType[] }): JSX.Element {

  return <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{ marginVertical: 15, paddingBottom: 5, borderBottomColor: colors.disabledBorderColor, borderBottomWidth: 1 }}>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={styles.label}>{label}<Text style={styles.requiredText}> *</Text></Text>
      <Text numberOfLines={1} style={styles.value}>
        {values?.map((value: any, index: number) => `${value.title}${index + 1 === values.length ? '' : ', '}`)}
      </Text>
    </View>
  </TouchableOpacity>
}

interface ShopDetailsProps {
  navigation: any
  route: any
  user: any
  creatingShopSuccess: boolean
  creatingShop: boolean
  creatingShopFailure: boolean
  fetching: boolean
  fetchError: boolean
  shopDetails: any
  updatingShop: boolean;
  updateShopSuccess: boolean;
  updateShopError: boolean;
  createShop: (data: CreateShopModel) => void
  resetCreateShopState: () => void
  fetchShop: (userId: string) => void
  resetFetchShopState: () => void
  resetUpdateShopState: () => void
  updateShop: (data: UpdateShopModel) => void
  logout: () => void
}

function ShopDetails({
  navigation,
  route,
  user,
  creatingShopSuccess,
  creatingShop,
  creatingShopFailure,
  fetching,
  fetchError,
  shopDetails,
  updateShopError,
  updateShopSuccess,
  updatingShop,
  createShop,
  resetCreateShopState,
  fetchShop,
  resetFetchShopState,
  updateShop,
  resetUpdateShopState,
  logout
}: ShopDetailsProps): JSX.Element {
  const isProfileStack = route?.params?.isProfileStack
  const [assets, setAssets] = useState<any>([])
  const [values, setValues] = useState<any>(fields)
  const [errors, setErrors] = useState(fields)
  const [touched, setTouched] = useState(fields)
  const [submitting, setSubmitting] = useState(false)
  const mapRef = useRef<any>(null)
  const [initialRegion, setInitialRegion] = useState({
    latitude: 34.0151,
    longitude: 71.5249,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  function handleBlur(fieldName: string, required: boolean) {
    return () => {
      if (values[fieldName] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      }
    }
  }
  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    if (value !== '')
      setErrors({ ...errors, [fieldName]: '' })
  }

  function handleCurrentLocation() {
    const { position, error } = LocationServices.getCurrentLocation()

    if (error === null) {
      handleChange(position.addressText ? position.addressText : '', 'address')

      setInitialRegion({ ...initialRegion, ...position })
      mapRef?.current?.animateToRegion({
        ...initialRegion,
        ...position,
      })
    }
  }

  async function handleRegionChange(region: Region) {
    // const value = await LocationServices.getAddressFromCoords({ latitude: region.latitude, longitude: region.longitude })
    // if (value) {
    //   handleChange(value, 'address')
    // }
    // setInitialRegion({ ...initialRegion, ...region });
  }

  function handleLocationPress(data: GooglePlaceData, detail: GooglePlaceDetail | null) {
    handleChange(detail?.formatted_address ? detail.formatted_address : '', 'address')
    if (detail?.geometry.location) {
      setInitialRegion({
        ...initialRegion,
        longitude: detail?.geometry?.location?.lng,
        latitude: detail?.geometry?.location?.lat
      })
      mapRef?.current?.animateToRegion({
        ...initialRegion,
        longitude: detail?.geometry?.location?.lng,
        latitude: detail?.geometry?.location?.lat
      })

    }
  }
  function handleAssets(asset: any[], index: number, assets: any[]) {

    if (assets.length == 0) {
      setAssets(asset)
      return
    }

    if (!!assets[index]?.uri && index !== -1) {
      let imageData = asset[0]

      setAssets(assets.map((item: any, currIndex: number) => {
        if (index === currIndex) {
          return {
            ...item,
            ...imageData
          }
        }
        return item
      }))
      return
    }

    if (asset && asset[0]?.uri) {
      let temp = assets.map((item: any) => item)
      let imageData = asset[0]
      temp.push(imageData)
      setAssets(temp)
      return
    }
  }

  function handleSignUp() {
    const data: CreateShopModel = {
      name: values.storeName,
      coordinates: [initialRegion.latitude.toString(), initialRegion.longitude.toString()],
      address: values.address,
      categories: values.category.map((cat: any) => cat.id),
      brands: values.brand.map((brand: any) => brand.id),
      models: values.model.map((model: any) => model.id),
      user: user._id,
      images: assets
    }
    createShop(data)
  }

  function handleUpdate() {

    const data: UpdateShopModel = {
      name: values.storeName,
      coordinates: [initialRegion.latitude.toString(), initialRegion.longitude.toString()],
      address: values.address,
      categories: values.category.map((cat: any) => cat.id),
      brands: values.brand.map((brand: any) => brand.id),
      models: values.model.map((model: any) => model.id),
      user: user._id,
      id: shopDetails._id,
      images: assets
    }

    updateShop(data)
  }

  useEffect(() => {
    if (isProfileStack) {
      fetchShop(user._id)
    }
  }, [])

  useEffect(() => {
    if (updateShopSuccess) {
      ToastService.success('Shop Details', 'Shop updated successfully!')
      resetUpdateShopState()
      logout()
    }
  }, [updateShopSuccess])

  useEffect(() => {
    if (creatingShopSuccess) {
      resetCreateShopState()
      navigation.navigate('Sign In')
    }
  }, [creatingShopSuccess])

  useEffect(() => {
    if (fetchError) {
      navigation.goBack()
      resetFetchShopState()
    }

    if (shopDetails) {
      setValues({
        ...fields,
        storeName: shopDetails?.name,
        location: '',
        address: shopDetails?.address,
        brand: shopDetails?.brands?.length > 0 ? shopDetails?.brands?.map((brand: any) => ({ id: brand._id, title: brand.name })) : [],
        model: shopDetails?.models?.length > 0 ? shopDetails?.models?.map((brand: any) => ({ id: brand._id, title: brand.name })) : [],
        category: shopDetails?.categories?.length > 0 ? shopDetails?.categories?.map((brand: any) => ({ id: brand._id, title: brand.name })) : [],
      })

      setInitialRegion({
        ...initialRegion,
        latitude: shopDetails?.coordinates?.[1] ? Number(shopDetails.coordinates[1]) : 34.0151,
        longitude: shopDetails?.coordinates?.[2] ? Number(shopDetails.coordinates[2]) : 71.5249,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setTimeout(() => {
        mapRef?.current?.animateToRegion({
          latitude: shopDetails?.coordinates?.[1] ? Number(shopDetails.coordinates[1]) : 34.0151,
          longitude: shopDetails?.coordinates?.[2] ? Number(shopDetails.coordinates[2]) : 71.5249,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      }, 200)

      setAssets(shopDetails?.images?.map((image: string) => ({
        fileName: image?.split('/')?.[0] ? image.split('/')[0] : image,
        type: "image/jpg",
        uri: constants.baseURL + image,
      })))
    }
  }, [fetchError, fetching])

  return <SafeAreaView style={styles.container}>
    {isProfileStack && fetching && <View style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute', height: '100%', width: '100%',
      zIndex: 99,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>}
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {!isProfileStack ? <Text style={styles.notification}>Shop details can be changed later from settings.</Text> : null}
      <CustomTextInput
        fieldName="storeName"
        required
        label="Store Name"
        disabled={false}
        placeholder="Enter your store name"
        touched={touched}
        setTouched={setTouched}
        value={values.storeName}
        errors={errors}
        onChangeText={(text: string) => handleChange(text, 'storeName')}
        onBlur={handleBlur('storeName', true)}
      />
      <LocationSelector
        mapRef={mapRef}
        initialRegion={initialRegion}
        handleLocationPress={handleLocationPress}
        handleCurrentLocation={handleCurrentLocation}
        handleRegionChange={handleRegionChange}
        disableAddressFetching={false}
        address={values.address}
        label="Address"
        placeholder="Enter address of your store"
        required
        setAddress={(value: string) => handleChange(value, 'address')}
        showCurrentLocationBtn
      />
      <SelectionButton
        label="Brand"
        values={values.brand}
        onPress={() => {
          navigation.navigate('Search', { title: 'Brand', values, setValues, multiSelect: true })
        }}
      />
      <SelectionButton
        label="Model"
        values={values.model}
        onPress={() => {
          if (values?.brand?.length !== 0)
            navigation.navigate('Search', { title: 'Model', values, setValues, multiSelect: true })
          else
            ToastService.warning('Search Model', 'Please select brand first')
        }}
      />
      <SelectionButton
        label="Category"
        values={values.category}
        onPress={() => {
          navigation.navigate('Search', { title: 'Category', values, setValues, multiSelect: true })
        }}
      />
      <MultipleImageSelector
        assets={assets}
        handleAssets={handleAssets}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
      <CustomButton
        title={isProfileStack ? 'Update' : "Sign Up"}
        disabled={values?.storeName == '' || values.address == '' || values?.brand?.length == 0 || values?.model?.length === 0 || values?.category?.length === 0 || creatingShop}
        submitting={creatingShop || updatingShop}
        onPress={isProfileStack ? handleUpdate : handleSignUp}
        type="primary"
      />

    </ScrollView>
  </SafeAreaView>
}

const mapStateToProps = (state: any) => ({
  creatingShop: state.Auth.creatingShop,
  creatingShopSuccess: state.Auth.creatingShopSuccess,
  creatingShopFailure: state.Auth.creatingShopFailure,
  updatingShop: state.Auth.updatingShop,
  updateShopSuccess: state.Auth.updateShopSuccess,
  updateShopError: state.Auth.updateShopError,
  fetching: state.Auth.fetchingShop,
  fetchError: state.Auth.fetchShopError,
  shopDetails: state.Auth.shopDetails,
  user: state.Auth.user,
})

const mapDispatchToProps = {
  createShop: actions.createShop,
  resetCreateShopState: authSlice.actions.resetCreateShopState,
  fetchShop: actions.fetchShop,
  resetFetchShopState: authSlice.actions.resetFetchShopState,
  resetUpdateShopState: authSlice.actions.resetUpdateShopState,
  updateShop: actions.updateShop,
  logout: authSlice.actions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    padding: 20
  },
  notification: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
  },
  label: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.primary,
    fontSize: font.sizes.normal,
    textTransform: 'capitalize'
  },
  value: {
    color: colors.textPrimary,
    maxWidth: '50%',
    // fontSize: font.sizes.input,
  },
  requiredText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.red,
    fontSize: font.sizes.normal
  },
})