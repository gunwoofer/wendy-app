import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { styles } from './WeekendsListScreenStyle';
import WeekendCard from '../../../components/WeekendCard/WeekendCard';
import { useAuthentication } from '../../../utils/hooks/useAuthentification';
import { Weekend } from '../../../models/weekend';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../Home';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';

type WeekendsListScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'WeekendsList'>;
type WeekendsListProps = {
    navigation: WeekendsListScreenNavigationProp;
    route: RouteProp<HomeStackParamList, 'WeekendsList'>;
};


const WeekendsListScreen = ({route, navigation}: WeekendsListProps) => {

  const { user } = useAuthentication();
  
  const [myWeekends, setmyWeekends] = useState<Weekend[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen was focused');
      if(user) {
        console.log("Screen focus and user detected");
        getWeekends()
      }
      return () => {
        console.log('Screen was unfocused');
      };
    }, [user])
  );
  
  useEffect(() => {

    if(user)
      getWeekends().catch(console.error);
  }, [user]);


  const onRefresh = () => {
    if (user) {
      setRefreshing(true);
      getWeekends();
    }
  }

  const getWeekends = async () => {
    console.log("Wassim test : " );
    console.log(user?.email);
    const response = await fetch('http://192.168.31.97:3000/getWeekends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user!.email }),
    });
    const data = await response.json();
    setmyWeekends(data);
    setRefreshing(false);
  }


  const handleCardPress = (weekend: Weekend) => {
    RootNavigation.navigate('Weekend', {weekend: weekend})
  };

 
  return (
      <View style={styles.container}>

        {/* weekends list */}
        {myWeekends ? (
        <View style={styles.container}>
          <FlatList
            data={myWeekends}
            renderItem={({ item }) => (
              <WeekendCard weekend={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
        </View>
        ) : null}
      </View>
  );
};

export default WeekendsListScreen;