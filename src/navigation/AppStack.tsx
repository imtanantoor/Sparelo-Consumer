import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';
import { Fragment, useEffect, useState } from 'react';
import helpers from '../utils/helpers';
import { PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import ToastService from '../Services/ToastService';
import authSlice from '../store/slices/authSlice';

const Stack = createNativeStackNavigator()

function AppStack(): JSX.Element | null {
  const navigation: any = useNavigation()
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch()
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
      dispatch(authSlice.actions.setFcmToken(token))
      console.log({ token })

      return token
    } catch (error) {
      return error
    }

  }
  function handleNotification(remoteMessage: any) {
    if (!!accessToken && !!remoteMessage) {
      const navigationHandler: any = {
        'Requests': () => navigation.navigate('MainTabs', { screen: remoteMessage.data.screen }),
        'Bid Detail': () => navigation.navigate('MainTabs', { screen: 'Requests', params: { screen: 'Bid Detail', params: { id: remoteMessage?.data?.id } } }),
        'Request Detail': () => navigation.navigate('MainTabs', { screen: 'Requests', params: { screen: 'Request Detail', params: { id: remoteMessage?.data?.id } } }),
        'Availability': () => navigation.navigate('MainTabs', { screen: 'Availability' }),
        'Cancelled Orders': () => navigation.navigate('MainTabs', { screen: 'Profile', params: { screen: 'Order History', params: { screen: 'Cancelled Orders' } } }),
        'Completed Orders': () => navigation.navigate('MainTabs', { screen: 'Profile', params: { screen: 'Order History', params: { screen: 'Completed Orders' } } }),
        'Pending Orders': () => navigation.navigate('MainTabs', { screen: 'Profile', params: { screen: 'Order History', params: { screen: 'Pending Orders' } } }),
      }
      // const { data } = remoteMessage
      setTimeout(() => {
        dispatch(authSlice?.actions?.setMode(remoteMessage?.data?.mode))
        navigationHandler?.[remoteMessage.data.screen]?.()
      }, 1000)
      // user?.user_type.includes('vendor') && user?.shopAdded ? navigation.navigate('MainTabs') : navigation.navigate('Auth')
    } else {
      navigation?.navigate('Auth')
    }
    setLoading(false);
  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    requestUserPermission()
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotification(remoteMessage)
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        handleNotification(remoteMessage)
      });
    getToken()

    return unsubscribe

  }, [accessToken]);

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