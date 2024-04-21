import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import { createStore } from 'easy-peasy';
import { StoreModel } from './src/state/models';
import { action, StoreProvider  } from 'easy-peasy';
import { Weekend } from './src/models/weekend';
import { StatusBar } from 'expo-status-bar';

const store = createStore<StoreModel>({
  currentWeekend: undefined,
  availableWeekends: [],
  setWeekend: action((state, payload) => {
    state.currentWeekend = payload;
  })
});


export default function App() {
  return (
    
    <StoreProvider store={store}>
      <StatusBar style="dark" />
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </StoreProvider>
  );
}