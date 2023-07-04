import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomTextInput from "../../components/global/CustomTextInput";
import { useRef, useState } from "react";
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

const fields = {
  storeName: '',
  location: '',
  address: '',
  brand: {
    id: '',
    name: ''
  },
  model: {
    id: '',
    name: ''
  },
  category: {
    id: '',
    name: ''
  },
}

function SelectionButton({ onPress, label, value }: { onPress: (props?: any) => void, label: string, value: string }): JSX.Element {
  return <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{ marginVertical: 15, paddingBottom: 5, borderBottomColor: colors.disabledBorderColor, borderBottomWidth: 1 }}>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={styles.label}>{label}<Text style={styles.requiredText}> *</Text></Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </TouchableOpacity>
}

function ShopDetails({ navigation, route, createShop }: any): JSX.Element {
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
      name: '',
      coordinates: '',
      address: '',
      category: '',
      brand: '',
      model: '',
      user: '',
      images: ''
    }
    createShop(data)
  }

  return <SafeAreaView style={styles.container}>
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
        value={values.brand.name}
        onPress={() => {
          navigation.navigate('Search', { title: 'Brand', values, setValues })
        }}
      />
      <SelectionButton
        label="Model"
        value={values.model.name}
        onPress={() => {
          if (values?.brand?.id)
            navigation.navigate('Search', { title: 'Model', values, setValues })
          else
            ToastService.warning('Search Model', 'Please select brand first')
        }}
      />
      <SelectionButton
        label="Category"
        value={values.category.name}
        onPress={() => {
          navigation.navigate('Search', { title: 'Category', values, setValues })
        }}
      />
      <MultipleImageSelector
        assets={assets}
        handleAssets={handleAssets}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
      <CustomButton
        title="Sign Up"
        disabled={values.storeName == '' || values.address == '' || values.brand.id === '' || values.model.id === '' || values.category.id === ''}
        submitting={false}
        onPress={handleSignUp}
        type="primary"
      />

    </ScrollView>
  </SafeAreaView>
}

const mapStateToProps = (state: any) => ({
  creatingShop: state.Auth,
  creatingShopSuccess: state.Auth,
  creatingShopFailure: state.Auth,
})

const mapDispatchToProps = {
  createShop: actions.createShop
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
    // fontSize: font.sizes.input,
  },
  requiredText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.red,
    fontSize: font.sizes.normal
  },
})