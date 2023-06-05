import { StyleSheet, Text, View } from "react-native";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import font from "../../constants/fonts";
import colors from "../../constants/colors";
import { useEffect } from "react";

interface AddressSearchProps {
  disabled: boolean
  required: boolean
  label: string
  placeHolder: string
  addressValue: string
  onAddressChange: (value: string) => void
  onLocationPress: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void
}

function AddressSearch({ disabled, required, label, placeHolder, addressValue, onAddressChange, onLocationPress }: AddressSearchProps): JSX.Element {

  return <View style={[styles.container]}>
    <Text style={[styles.label, { color: disabled ? colors.disabledInput : styles.label.color }]}>{label}{required && <Text style={styles.requiredText}> *</Text>}</Text>
    <GooglePlacesAutocomplete
      placeholder={placeHolder}
      suppressDefaultStyles
      onPress={onLocationPress}
      fetchDetails={true}
      currentLocation={true}
      query={{
        key: 'AIzaSyAjGrrnirfZx2g_t88ZkW8hCt3rrv9wWEg',
        // type: `(cities)`,
      }}
      GooglePlacesDetailsQuery={{
        fields: ['formatted_address', 'geometry'],
      }}
      keepResultsAfterBlur
      keyboardShouldPersistTaps="always"
      enablePoweredByContainer={false}
      textInputProps={{
        value: addressValue,
        onChangeText: onAddressChange,
      }}
      enableHighAccuracyLocation
      currentLocationLabel="Current Location"
      styles={{
        container: {
          width: '100%',
          // borderBottomWidth: 1,
        },
        row: {
          paddingVertical: 10,
        },
        textInput: styles.textInput
      }}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
    // minHeight: 100,
  },
  label: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.primary,
    fontSize: font.sizes.normal,
    textTransform: 'capitalize'
  },
  textInput: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.textPrimary,
    fontSize: font.sizes.input,
    borderBottomColor: colors.primary,
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  requiredText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.red,
    fontSize: font.sizes.normal
  },
  fieldError: {
    fontSize: font.sizes.normal,
    color: colors.red,
    marginVertical: 5
  }
})

export default AddressSearch