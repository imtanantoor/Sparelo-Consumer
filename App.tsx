import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </PersistGate>
    <Toast />
  </Provider>
}

export default App
