import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/context/AppContext'; // Simpan konteks di sini
import MainNavigation from './src/navigation/MainNavigation'; // File navigasi utama

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
