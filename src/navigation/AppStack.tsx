import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';
import { Fragment, useEffect, useState } from 'react';
import helpers from '../utils/helpers';
import { PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import ToastService from '../Services/ToastService';

const Stack = createNativeStackNavigator()

function AppStack(): JSX.Element | null {
  const navigation: any = useNavigation()
  const [loading, setLoading] = useState<boolean>(true);
  const [initialRoute, setInitialRoute] = useState<string>('Home');
  const { accessToken, mode, user } = useSelector((state: any) => ({
    accessToken: state.Auth.accessToken,
    mode: state.Auth.mode,
    user: state.Auth.user
  }))

  useEffect(() => {
    let permissions = Platform.OS === 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE] : [PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.POST_NOTIFICATIONS, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
    helpers.requestPermissions(permissions)
  }, [])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log({ token })

      return token
    } catch (error) {
      console.log({ error })
      return error
    }

  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    requestUserPermission()
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (!!accessToken) {
        user?.user_type.includes('vendor') && user?.shopAdded ? navigation.navigate('MainTabs') : navigation.navigate('Auth')
      } else {
        navigation.navigate('Auth')
      }
      setLoading(false);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // if (remoteMessage) {
        //   console.log(
        //     'Notification caused app to open from quit state:',
        //     remoteMessage.notification,
        //   );
        //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        // }
        setLoading(false);
      });
    getToken()

    return unsubscribe

  }, []);

  if (loading) return null

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