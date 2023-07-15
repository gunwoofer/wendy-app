import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/Home';
import WeekendScreen from '../screens/WeekendScreen/WeekendScreen';
import { Weekend } from '../models/weekend';


export type RootStackParamList = {
  Home: undefined, 
  Weekend: { weekend: Weekend }; 
};

const Stack = createStackNavigator<RootStackParamList>();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Weekend" component={WeekendScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}