import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../../constants/colors";
import font from "../../../constants/fonts";
import Search from "../../../screens/MainTab/Home/FindYourParts/Search";
import SearchParts from "../../../screens/MainTab/Home/FindYourParts/SearchParts";
import FilterScreen from "../../../screens/MainTab/Home/FindYourParts/Filter";
import RequestSummary from "../../../screens/MainTab/Requests/RequestSummary";
import Results from "../../../screens/MainTab/Home/FindYourParts/Results";
import HeaderBack from "../../../components/molecular/HeaderBack";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

function CustomHeaderLeft(): JSX.Element {
  const navigation = useNavigation()

  return <HeaderBack onPress={navigation.goBack} />
}

function FindYourPartsStack(): JSX.Element {
  return <Stack.Navigator
    initialRouteName="Filter"
    screenOptions={{
      contentStyle: { backgroundColor: colors.white },
      headerTitleStyle: {
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
        color: colors.primary,
        fontSize: font.sizes.fourteen
      },
      headerTitleAlign: 'center',
      headerLeft: CustomHeaderLeft
    }}
  >
    <Stack.Screen name="Filter" component={FilterScreen} />
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="Search Parts" component={SearchParts} />
    <Stack.Screen name="Results" component={Results} />
    <Stack.Screen name="Request Summary" options={{
      headerTitleStyle: {
        fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold,
      }
    }} component={RequestSummary} />
  </ Stack.Navigator>
}

export default FindYourPartsStack