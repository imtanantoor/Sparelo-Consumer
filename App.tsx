import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack';
import { Provider } from 'react-redux';
import store from './src/store';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return <Provider store={store}>
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
    <Toast />
  </Provider>
}

export default App
