import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../constants/colors";
import AddCar from "../../screens/MainTab/Home/AddCar";
import Home from "../../screens/MainTab/Home/Home";
import FindYourPartsStack from "./FindYourParts/FindYourPartsStack";
import constants from "../../utils/constants";

const Stack = createNativeStackNavigator()

function HomeStack(): JSX.Element {
  return <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white, } }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="FindYourParts" component={FindYourPartsStack} />
    <Stack.Screen name="Add Car" options={{
      headerTitleStyle: constants.headerTitleStyle
    }} component={AddCar} />
  </Stack.Navigator>
}

export default HomeStack