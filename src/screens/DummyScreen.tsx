import { SafeAreaView, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";
import font from "../constants/fonts";

function DummyScreen(): JSX.Element {
  return <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Section in progress</Text>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).medium,
    fontSize: font.sizes.title,
    color: colors.primary
  }
})

export default DummyScreen