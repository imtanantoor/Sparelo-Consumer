import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import Logo from "../../assets/Logo";
import CustomButton from "../../components/global/CustomButton";
import { View } from "react-native";
import font from "../../constants/fonts";
import { useDispatch } from "react-redux";
import authSlice from "../../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";

function ModeSelection(): JSX.Element {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()

  function handleMode(mode: string) {
    return () => {
      dispatch(authSlice.actions.setMode(mode))
      navigation.navigate('Auth', { screen: 'Sign In' })
    }
  }

  return <SafeAreaView style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.logoAndHeadingContainer}>
        <Logo />
        <Text
          style={styles.heading}>Continue as</Text>
      </View>
      <CustomButton
        title="Buyer"
        disabled={false}
        submitting={false}
        onPress={handleMode('buyer')}
        buttonStyle={styles.buyerButton}
        type="primary"
      />
      <CustomButton
        title="Vendor"
        disabled={false}
        submitting={false}
        onPress={handleMode('vendor')}
        buttonStyle={styles.vendorButton}
        type="primary"
      />
    </View>
  </SafeAreaView>
}

export default ModeSelection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  logoAndHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.hero,
    marginHorizontal: 20
  },
  buyerButton: { width: '100%', marginTop: 50 },
  vendorButton: { width: '100%', backgroundColor: '#262626' }
})