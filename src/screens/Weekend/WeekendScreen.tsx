import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image  } from 'react-native';
import { Weekend } from '../../models/weekend';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons   } from '@expo/vector-icons';
import { styles } from './WeekendScreenStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeScreen from '../Home/Home';
import GeneralScreen from './General/GeneralScreen';
import TransportScreen from './Transport/TransportScreen';
import GuestsScreen from './Guests/GuestScreen';
import { RootStackParamList } from '../../navigation/userStack';

export type WeekendStackParamList = {
  General: { weekend: Weekend },
  Guest : { weekend: Weekend },
  Transport : { weekend: Weekend };
};
const Tab = createBottomTabNavigator<WeekendStackParamList>();

type WeekendScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Weekend'>;
type WeekendProps = {
    navigation: WeekendScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Weekend'>;
};

const WeekendScreen = ({route, navigation}: WeekendProps) => {



  return (
        <Tab.Navigator initialRouteName='General'
        screenOptions={{headerShown:false}}> 
            <Tab.Screen 
                name='General' 
                initialParams={{ weekend : route.params.weekend }}
                component={GeneralScreen}
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="card-text" size={24} color={'#000'}  />
                    ),
                }}
            />
            <Tab.Screen 
                name='Guest'
                initialParams={{ weekend : route.params.weekend }}
                component={GuestsScreen} 
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group" size={24} color={'#000'} />
                    ),
                }}
            />
            <Tab.Screen 
                name='Transport'
                initialParams={{ weekend : route.params.weekend }}
                component={TransportScreen} 
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car" size={24} color={'#000'}/>
                    ),
                }}
            />
        </Tab.Navigator>
  );
};


export default WeekendScreen;

