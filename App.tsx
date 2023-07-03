import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './src/config/firebase';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}