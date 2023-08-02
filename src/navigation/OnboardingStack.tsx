import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1 from "../screens/Onboarding/Step1";
import Step2 from "../screens/Onboarding/Step2";
import ModeSelection from "../screens/Auth/ModeSelection";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Stack = createNativeStackNavigator()

function OnboardingStack(): JSX.Element {
  const { showOnBoarding } = useSelector((state: any) => state.GlobalConfig)
  return <Stack.Navigator initialRouteName={showOnBoarding ? 'step1' : 'Mode Selection'} screenOptions={{ headerShown: false }}>
    {showOnBoarding && <Fragment>
      <Stack.Screen component={Step1} name="step1" />
      <Stack.Screen component={Step2} name="step2" />
    </Fragment>}
    <Stack.Screen component={ModeSelection} name="Mode Selection" />
  </Stack.Navigator>
}
export default OnboardingStack