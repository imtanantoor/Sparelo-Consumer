import ReactNativeModal from "react-native-modal";
import colors from "../../constants/colors";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import font from "../../constants/fonts";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import LocationServices from "../../Services/LocationServices";
import CustomTextInput from "../global/CustomTextInput";
import MapPosition from "../../models/mapPosition";
import CurrentLocation from "../../assets/icons/CurrentLocation";
import AddressSearch from "./AddressSearch";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import CustomButton from "../global/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LocationSelector from "./LocationSelector";

interface LocationModalProps {
  visible: boolean
  hideModal: () => any
  addressValue: string
  initialLocation: MapPosition | null
  fromContinue: boolean
}

function LocationModal({ visible, addressValue, initialLocation, fromContinue, hideModal }: LocationModalProps): JSX.Element {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation<NavigationProp<any>>()
  const [address, setAddress] = useState<string>(addressValue)
  const [disableAddressFetching, setDisableAddressFetching] = useState(fromContinue)
  const locationService = LocationServices;
  const [latitude, setLatitude] = useState(initialLocation?.latitude)
  const [longitude, setLongitude] = useState(initialLocation?.longitude)
  const [initialRegion, setInitialRegion] = useState({
    latitude: 34.0151,
    longitude: 71.5249,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    ...initialLocation
  });

  useEffect(() => {
    setInitialRegion({ ...initialRegion, ...initialLocation })
    setLatitude(initialLocation?.latitude)
    setLongitude(initialLocation?.longitude)
    setAddress(addressValue)
    setDisableAddressFetching(fromContinue)
    setTimeout(() => {
      mapRef?.current?.animateToRegion({
        ...initialRegion,
        ...initialLocation
      })
    }, 500)
  }, [initialLocation?.latitude, initialLocation?.longitude, addressValue, fromContinue])

  function handleCurrentLocation() {

    const { position, error } = locationService.getCurrentLocation()

    if (error === null) {
      setAddress(position.addressText ? position.addressText : '')
      setInitialRegion({ ...initialRegion, ...position })
      setLatitude(position.latitude)
      setLongitude(position.longitude)
      mapRef?.current?.animateToRegion({
        ...initialRegion,
        ...position,
      })
      setDisableAddressFetching(false)
    }
  }

  async function handleRegionChange(region: Region) {
    if (!disableAddressFetching) {
      const value = await locationService.getAddressFromCoords({ latitude: region.latitude, longitude: region.longitude })
      if (value) {
        setAddress(value)
      }
    }

    setLongitude(region.longitude)
    setLatitude(region.latitude)
    setInitialRegion({ ...initialRegion, ...region });
  }

  function handleLocationPress(data: GooglePlaceData, detail: GooglePlaceDetail | null) {
    setDisableAddressFetching(true)
    setAddress(detail?.formatted_address ? detail.formatted_address : '')
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
      setTimeout(() => {
        setDisableAddressFetching(false)
      }, 1000)
    }
  }

  function handleConfirmLocation() {
    navigation.navigate('Order Summary', { address, initialRegion: { ...initialRegion, latitude, longitude } })
    hideModal()
  }

  return <ReactNativeModal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
    style={styles.modalContainer}
  >
    <View style={styles.popUp}>
      <LocationSelector
        mapRef={mapRef}
        initialRegion={initialRegion}
        handleLocationPress={handleLocationPress}
        handleCurrentLocation={handleCurrentLocation}
        handleRegionChange={handleRegionChange}
        disableAddressFetching={disableAddressFetching}
        address={address}
        setAddress={setAddress}
      />
      <CustomButton
        title="Confirm Location"
        disabled={!!address === false}
        submitting={false}
        type='primary'
        buttonStyle={{ width: '100%' }}
        onPress={handleConfirmLocation}
      />
    </View>
  </ReactNativeModal >
}

export default LocationModal;

const styles = StyleSheet.create({
  modalContainer: { padding: 0, margin: 0, justifyContent: 'flex-end' },
  popUp: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.title,
    marginVertical: 24
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 24
  },
  currentLocationButton: { alignSelf: 'flex-end', backgroundColor: colors.white, padding: 5, justifyContent: 'center', alignItems: 'center', bottom: 50, right: 20 }
})