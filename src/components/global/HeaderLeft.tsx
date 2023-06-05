import { StyleSheet, Text, View } from "react-native";
import Logo from "../../assets/Logo";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

function HeaderLeft(): JSX.Element {
  return <View style={styles.container}>
    <Logo />
    <View style={styles.textContainer}>
      <Text style={styles.title}>Sparelo</Text>
      <Text style={styles.slogan}>Reshaping the way you</Text>
      <Text style={styles.slogan}>get auto parts</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    paddingHorizontal: 5
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'UnicaOne-Regular',
    fontSize: font.sizes.title
  },
  slogan: {
    color: colors.textPrimary,
    fontFamily: 'UnicaOne-Regular',
    fontSize: font.sizes.normal
  }
})

export default HeaderLeft