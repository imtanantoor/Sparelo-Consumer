import { Fragment } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import CurrentLocation from "../../assets/icons/CurrentLocation";
import AddressSearch from "./AddressSearch";
import colors from "../../constants/colors";

interface LocationSelectorProps {
  mapRef: any
  initialRegion: any
  handleRegionChange: any
  address: string
  setAddress: any
  disableAddressFetching: boolean
  handleLocationPress: any
  handleCurrentLocation: any
  label?: string
  required?: boolean
  placeholder?: string
}

function LocationSelector({ mapRef, initialRegion, handleRegionChange, address, setAddress, disableAddressFetching, handleLocationPress, handleCurrentLocation, label, required, placeholder }: LocationSelectorProps): JSX.Element {
  return <Fragment>
    <MapView
      ref={mapRef}
      initialRegion={initialRegion}
      // region={initialRegion}
      userLocationPriority="high"
      followsUserLocation
      provider={PROVIDER_GOOGLE}
      style={{ height: 200, width: '100%', borderRadius: 8 }}
      onRegionChange={handleRegionChange}
    >
      <Marker coordinate={initialRegion} />
    </MapView>
    <TouchableOpacity onPress={handleCurrentLocation} style={styles.currentLocationButton}>
      <CurrentLocation fill={colors.primary} />
    </TouchableOpacity>
    <AddressSearch
      required={required ?? false}
      disabled={false}
      label={label ?? "Your Location"}
      addressValue={address}
      onAddressChange={(value) => {
        if (disableAddressFetching === false)
          setAddress(value)
      }}
      onLocationPress={handleLocationPress}
      placeHolder={placeholder ?? "Enter address"}
    />

  </Fragment>
}

export default LocationSelector

const styles = StyleSheet.create({
  currentLocationButton: { alignSelf: 'flex-end', backgroundColor: colors.white, padding: 5, justifyContent: 'center', alignItems: 'center', bottom: 50, right: 20 }

})