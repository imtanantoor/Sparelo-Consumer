import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';
import { useEffect } from 'react';
import helpers from '../utils/helpers';
import { PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator()

function AppStack(): JSX.Element {
  useEffect(() => {
    let permissions = Platform.OS === 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
    helpers.requestPermissions(permissions)
  }, [])

  return <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Onboarding' component={OnboardingStack} />
    <Stack.Screen name="Auth" component={AuthStack} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
}

export default AppStack