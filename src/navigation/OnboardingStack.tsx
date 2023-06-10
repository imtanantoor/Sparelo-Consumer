import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1 from "../screens/Onboarding/Step1";
import Step2 from "../screens/Onboarding/Step2";
import ModeSelection from "../screens/Auth/ModeSelection";

const Stack = createNativeStackNavigator()

function OnboardingStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Step1} name="step1" />
    <Stack.Screen component={Step2} name="step2" />
    <Stack.Screen component={ModeSelection} name="Mode Selection" />
  </Stack.Navigator>
}
export default OnboardingStack