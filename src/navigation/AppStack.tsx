import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';
import { Fragment, useEffect } from 'react';
import helpers from '../utils/helpers';
import { PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator()

function AppStack(): JSX.Element {
  const { accessToken, mode, user } = useSelector((state: any) => ({
    accessToken: state.Auth.accessToken,
    mode: state.Auth.mode,
    user: state.Auth.user
  }))

  useEffect(() => {
    let permissions = Platform.OS === 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE] : [PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
    helpers.requestPermissions(permissions)
  }, [])

  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    {mode === 'buyer' && !!accessToken ?
      <Stack.Screen name="MainTabs" component={MainTabs} /> :
      user?.user_type.includes('vendor') && user?.shopAdded ? <Stack.Screen name="MainTabs" component={MainTabs} /> :
        <Fragment>
          <Stack.Screen name='Onboarding' component={OnboardingStack} />
          <Stack.Screen name="Auth" component={AuthStack} />
        </Fragment>
    }
  </Stack.Navigator>
}

export default AppStack