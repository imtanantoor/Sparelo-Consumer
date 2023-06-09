import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AvailabilityHome from "../../../screens/MainTab/Availability/AvailabilityHome";
import colors from "../../../constants/colors";
import font from "../../../constants/fonts";

const Stack = createNativeStackNavigator()

function AvailabilityStack(): JSX.Element {
  return <Stack.Navigator
    screenOptions={{
      contentStyle: { backgroundColor: colors.white },
      headerTitleStyle: {
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
      },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen name="Availability" component={AvailabilityHome} />
  </Stack.Navigator>
}

export default AvailabilityStack