
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import OtpInputScreen from '../screens/auth/OtpInputScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OtpInput" component={OtpInputScreen} />
                <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;
