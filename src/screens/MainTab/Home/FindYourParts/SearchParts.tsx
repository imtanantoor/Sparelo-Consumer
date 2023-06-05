import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../../constants/colors";
import font from "../../../../constants/fonts";
import PartsTopTabs from "../../../../navigation/PartsTopTabs/PartsTopTabs";
import { Fragment, useLayoutEffect } from "react";
import CustomButton from "../../../../components/global/CustomButton";

function SearchParts({ route, navigation }: NativeStackScreenProps<any>): JSX.Element {
  const { category, brand, manufacturingYear, model, carId }: any = route.params

  function handleSendNewRequest() {
    navigation.navigate('Request Summary', { category, brand, manufacturingYear, model, carId })
  }

  return <Fragment >
    <View style={styles.container}>
      <View style={styles.searchParamsRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.carName}>Brand: <Text style={styles.carMake}>{route?.params?.brand.name ?? ''}</Text></Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.carName}>Year: <Text style={styles.carMake}>{route?.params?.manufacturingYear ?? ''}</Text></Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.carName}>Model: <Text style={styles.carMake}>{route?.params?.model?.name ?? ''}</Text></Text>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Last Bids</Text>
      </View>
    </View>
    <PartsTopTabs navigation={navigation} route={route} />
    <CustomButton
      title="Send New Request"
      type="primary"
      disabled={false}
      submitting={false}
      onPress={handleSendNewRequest}
      buttonStyle={{ marginHorizontal: 20, marginBottom: 20 }}
    />
  </Fragment>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
  carName: {
    fontSize: font.sizes.normal,
    color: colors.lightGray,
    marginVertical: 7,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular
  },
  carMake: {
    color: colors.primary,
    fontSize: font.sizes.normal,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    marginHorizontal: 10
  },
  searchParamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginRight: 10
  }
})

export default SearchParts