import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import Scann from './Scann'

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Accueil',
        tabBarColor: '#0f3453',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    
    <Tab.Screen
      name="Scan"
      component={Scann}
      options={{
        tabBarLabel: 'Scan',
        tabBarColor: '#0f3453',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />

  </Tab.Navigator>

);

export default MainTabScreen;