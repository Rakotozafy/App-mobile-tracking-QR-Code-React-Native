import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Root from '../components/Authentification/Root';
const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (

    <RootStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >

        <RootStack.Screen name="Bienvenue" component={SplashScreen} />

        <RootStack.Screen name="root" component={Root} />
        <RootStack.Screen name="Authentification" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
);

export default RootStackScreen;