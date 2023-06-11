import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import EditProfile from "../../screens/MainTab/Profile/EditProfile";
import Profile from "../../screens/MainTab/Profile/Profile";
import ShopDetails from "../../screens/Auth/ShopDetails";

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
    <Stack.Screen name="Edit Profile" component={EditProfile} />
    <Stack.Screen name="Shop Details" component={ShopDetails} />
  </Stack.Navigator>
}

export default ProfileStack