import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import EditProfile from "../../screens/MainTab/Profile/EditProfile";
import Profile from "../../screens/MainTab/Profile/Profile";
import ShopDetails from "../../screens/Auth/ShopDetails";
import Search from "../../screens/MainTab/Home/FindYourParts/Search";
import DummyScreen from "../../screens/DummyScreen";
import OrderHistory from "../../screens/MainTab/Profile/OrderHistory";
import ResetPassword from "../../screens/Auth/ResetPassword";
import ChangePassword from "../../screens/Auth/ChangePassword";

const Stack = createNativeStackNavigator()

function ProfileStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{
    contentStyle: { backgroundColor: colors.white },
    headerTitleStyle: {
      fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
      color: colors.primary,
      fontSize: font.sizes.fourteen,
    },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
  }}>
    <Stack.Screen name="My Profile" component={Profile} />
    <Stack.Screen name="Order History" component={OrderHistory} />
    <Stack.Screen name="Change Password" options={{ headerShown: false }} component={ChangePassword} />
    <Stack.Screen name="Edit Profile" component={EditProfile} />
    <Stack.Screen name="Shop Details" component={ShopDetails} />
    <Stack.Screen name="Search" options={{ contentStyle: { backgroundColor: colors.white } }} component={Search} />

  </Stack.Navigator>
}

export default ProfileStack