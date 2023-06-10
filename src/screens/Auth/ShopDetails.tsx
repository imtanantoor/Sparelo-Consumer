import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomTextInput from "../../components/global/CustomTextInput";
import CustomForm from "../../components/organism/CustomForm";
import { useRef, useState } from "react";
import LocationSelector from "../../components/organism/LocationSelector";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import LocationServices from "../../Services/LocationServices";
import { Region } from "react-native-maps";

const fields = {
  storeName: '',
  location: '',
  address: '',
  brand: '',
  model: '',
  category: '',
}


function ShopDetails({ navigation }: any): JSX.Element {
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
    const value = await LocationServices.getAddressFromCoords({ latitude: region.latitude, longitude: region.longitude })
    if (value) {
      handleChange(value, 'address')

    }
    setInitialRegion({ ...initialRegion, ...region });
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

  function handleConfirmLocation() {
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.notification}>Shop details can be changed later from settings.</Text>
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
      />
    </ScrollView>
  </SafeAreaView>
}

export default ShopDetails

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
  }
})