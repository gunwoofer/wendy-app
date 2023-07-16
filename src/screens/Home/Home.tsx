import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert, FlatList } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { styles } from './HomeStyle'; // Import styles from the styles.js file
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../../utils/hooks/useAuthentification';
import { Weekend } from '../../models/weekend';
import WeekendCard from '../../components/WeekendCard/WeekendCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/userStack';
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeekendScreen from '../Weekend/WeekendScreen';
import WeekendsListScreen from './WeekendsList/WeekendsListScreen';
import ProfileScreen from './Profile/ProfileScreen';
import AddWeekendScreen from './AddWeekend/AddWeekendScreen';
import AddWeekendModal from './AddWeekend/AddWeekendModal';

// Tab navigation
export type HomeStackParamList = {
  WeekendsList: undefined,
  AddWeekend: undefined,
  Profile : undefined,
};
const Tab = createBottomTabNavigator<HomeStackParamList>();

// Global navigation
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeProps = {
    navigation: HomeScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({route, navigation}: HomeProps) => {

  return (
    <Tab.Navigator initialRouteName='WeekendsList' screenOptions={{headerShown:false}}> 
            <Tab.Screen 
                name='WeekendsList' 
                component={WeekendsListScreen}
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={24} color={'#000'}  />
                    ),
                    tabBarLabel: "My Weekends"
                }}
            />
            <Tab.Screen 
                name="AddWeekend" 
                component={AddWeekendScreen} 
                listeners={
                    ({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            console.log("TEST LISTENER");
                            navigation.navigate("WeekendsList");
                        },
                    })
                }
                options={{
                  tabBarButton: () => (<AddWeekendModal />),
                }}/>
            <Tab.Screen 
                name='Profile'
                component={ProfileScreen} 
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={24} color={'#000'} />
                    ),
                }}
            />
        </Tab.Navigator>
  );
};

export default HomeScreen;
