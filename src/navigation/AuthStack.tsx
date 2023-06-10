import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import ResetSuccess from "../screens/Auth/ResetSuccess";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import Verification from "../screens/Auth/Verification";
import Verified from "../screens/Auth/Verified";
import ModeSelection from "../screens/Auth/ModeSelection";
import ShopDetails from "../screens/Auth/ShopDetails";
import font from "../constants/fonts";
import colors from "../constants/colors";
import HeaderBack from "../components/molecular/HeaderBack";
import { useNavigation } from "@react-navigation/native";
import Search from "../screens/MainTab/Home/FindYourParts/Search";

const Stack = createNativeStackNavigator()

function AuthStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{
    headerShadowVisible: false
  }} initialRouteName="Sign In">
    <Stack.Screen name="Sign Up" component={SignUp} />
    <Stack.Screen name="Sign In" component={SignIn} />
    <Stack.Screen name="Forgot Password" component={ForgotPassword} />
    <Stack.Screen name="Reset Password" component={ResetPassword} />
    <Stack.Screen name="Reset Success" component={ResetSuccess} />
    <Stack.Screen name="Verification" component={Verification} />
    <Stack.Screen name="Verified" component={Verified} />
    <Stack.Screen name="Search" options={{ contentStyle: { backgroundColor: colors.white } }} component={Search} />
    <Stack.Screen name="Shop Details" options={{
      headerLeft: () => {
        const navigation = useNavigation()
        return <HeaderBack onPress={navigation.goBack} />
      },
      headerTitleStyle: {
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
        color: colors.primary,
        fontSize: font.sizes.fourteen
      },
      headerTitleAlign: 'center',
    }} component={ShopDetails} />
  </Stack.Navigator>
}

export default AuthStack