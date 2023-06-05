import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../../constants/colors";
import font from "../../../../constants/fonts";
import { Fragment } from "react";
import ResultBidsTabs from "../../../../navigation/MainTabs/FindYourParts/ResultBidsTabs";

function Results({ route, navigation }: NativeStackScreenProps<any>): JSX.Element {

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
    <ResultBidsTabs route={{ ...route }} navigation={navigation} />
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

export default Results