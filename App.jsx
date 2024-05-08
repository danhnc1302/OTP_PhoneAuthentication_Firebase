import React from 'react';
import AppNavigation from "./src/navigation"
import { StatusBar } from 'react-native';

function App() {

  return (
    <>
      <AppNavigation />
      <StatusBar backgroundColor="#F4F2FA" barStyle="dark-content" />
    </>
  );
}

export default App;
