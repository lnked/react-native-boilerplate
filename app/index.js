import React from 'react'
import { Platform, UIManager } from 'react-native'
import { StoreContext } from 'redux-react-hook'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { RootScreen } from 'app/screens/RootScreen'
import { createStore } from './createStore'

const { store, persistor } = createStore()

// Enable Layout Animation on android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const App = () => (
  <StoreContext.Provider value={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootScreen />
    </PersistGate>
  </StoreContext.Provider>
)

export default App
