import { Platform, StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomHeader(props: any): JSX.Element {

  return <SafeAreaView style={styles.container}>
    {props?.options.headerLeft()}
    {props?.options.headerRight()}
  </SafeAreaView>
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: colors.white
  }
})