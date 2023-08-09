import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import { useLayoutEffect, useState } from "react";
import font from "../../constants/fonts";
import HeaderBack from "../../components/molecular/HeaderBack";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import AddressSearch from "../../components/organism/AddressSearch";
import CustomButton from "../../components/global/CustomButton";
import CurrentLocation from "../../assets/icons/CurrentLocation";
import { View } from "react-native";
import LocationModal from "../../components/organism/LocationModal";
import MapPosition from "../../models/mapPosition";

function DeliveryAddress({ navigation }: any): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)
  const [fromContinue, setFromContinue] = useState(false)
  const [locationValue, setLocationValue] = useState<MapPosition>({
    latitude: 34.0151,
    longitude: 71.5249,
    addressText: ''
  })
  // const [pickedAddressFromGoogle, setPickedAddressFromGoogle] = useState<boolean>(false)
  const [confirmDisabled, setConfirmDisabled] = useState<boolean>(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
      headerTitleStyle: {
        color: '#3C3A35',
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular
      }
    })
  }, [])

  function handleChange(value: string, fieldName: string) {
    // setPickedAddressFromGoogle(false)
    setConfirmDisabled(true)
    setLocationValue({ ...locationValue, [fieldName]: value })
  }

  function handleLocationPress(data: GooglePlaceData, detail: GooglePlaceDetail | null) {
    if (detail?.geometry.location) {
      setLocationValue({
        ...locationValue,
        longitude: detail?.geometry?.location?.lng,
        latitude: detail?.geometry?.location?.lat,
        addressText: detail?.formatted_address ? detail.formatted_address : locationValue.addressText
      })

      // setPickedAddressFromGoogle(true)
      setConfirmDisabled(false)
    }
  }

  function openModal() {
    setFromContinue(locationValue.addressText ? true : false)
    setTimeout(() => {
      setModalVisible(true)
    }, 500)
  }


  return <SafeAreaView style={styles.container}>
    <View>
      <AddressSearch
        required={false}
        disabled={false}
        label="Your address"
        addressValue={locationValue.addressText ? locationValue.addressText : ''}
        onAddressChange={(value) => handleChange(value, 'addressText')}
        onLocationPress={handleLocationPress}
        placeHolder="Enter address"
      />
      <TouchableOpacity onPress={openModal} style={styles.chooseLocation}>
        <Text style={styles.locationText}>Choose current location</Text>
        <CurrentLocation />
      </TouchableOpacity>
    </View>
    <CustomButton
      title="Continue"
      disabled={!!locationValue?.addressText === false || confirmDisabled}
      submitting={false}
      type="primary"
      buttonStyle={{ alignSelf: 'flex-end', width: '100%' }}
      onPress={openModal}
    />
    <LocationModal
      visible={modalVisible}
      initialLocation={locationValue}
      fromContinue={fromContinue}
      confirmDisabled={confirmDisabled}
      addressValue={locationValue.addressText ? locationValue.addressText : ''}
      setConfirmDisabled={setConfirmDisabled}
      hideModal={() => {
        setModalVisible(false)
        setFromContinue(false)
        setConfirmDisabled(false)
        // setPickedAddressFromGoogle(true)
      }}
    />
  </SafeAreaView>
}

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between'
  },
  chooseLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.disabledBorderColor,
    borderBottomWidth: 1,
  },
  locationText: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.primary
  }
})