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
import { useStoreActions, useStoreState } from '../../../state/hooks';
import WeekendService from '../../../services/WeekendService';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const url = 'http://192.168.0.101:3000'

type WeekendsListScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'WeekendsList'>;
type WeekendsListProps = {
  navigation: WeekendsListScreenNavigationProp;
  route: RouteProp<HomeStackParamList, 'WeekendsList'>;
};


const WeekendsListScreen = ({ route, navigation }: WeekendsListProps) => {
  const weekendService = WeekendService.getInstance();

  const { user } = useAuthentication();
  const setCurrentWeekend = useStoreActions((actions) => actions.setWeekend);

  const [myWeekends, setmyWeekends] = useState<Weekend[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [futureWeekends, setFutureWeekends] = useState<Weekend[]>([]);
  const [pastWeekends, setPastWeekends] = useState<Weekend[]>([]);

  const [allWeekends, setAllWeekends] = useState<Weekend[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        getWeekends()
      }
    }, [user])
  );

  useEffect(() => {

    if (user)
      getWeekends().catch(console.error);
  }, [user]);


  const onRefresh = () => {
    if (user) {
      setRefreshing(true);
      getWeekends();
    }
  }

  const categorizeWeekends = (weekends: Weekend[]) => {
    const currentDate = new Date();
    const categorizedWeekends = weekends.map((weekend) => ({
      ...weekend,
      status: new Date(weekend.date_debut) > currentDate || weekend.date_debut == undefined ? "coming" : "past",
    }));
    setAllWeekends(categorizedWeekends);
  };

  useEffect(() => {
    categorizeWeekends(myWeekends);
  }, [myWeekends]);

  // Sorting function to sort weekends by date
  const sortByDate = (a: Weekend, b: Weekend) => {
    if (!a.date_debut && b.date_debut) {
      return -1; // Place weekends with undefined date_debut at the top
    } else if (!b.date_debut && a.date_debut) {
      return 1; // Place weekends with undefined date_debut at the top
    } else if (!a.date_debut && !b.date_debut) {
      return 0; // No sorting needed for weekends with undefined date_debut
    }
  
    return new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime();
  
  };



  const getWeekends = async () => {
    const response = await fetch(url + '/getWeekends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user!.uid }),
    });
    console.log("getWeekends response")
    const data = await response.json();
    
    console.log("getWeekends data")
    console.log(user!.uid)
    console.log(data);
    setmyWeekends(data);
    setRefreshing(false);
  }


  const handleCardPress = async (weekend: Weekend) => {
    const chosenWeekend: Weekend = await weekendService.getWeekendByIdAPI(weekend.id);
    setCurrentWeekend(chosenWeekend);
    RootNavigation.navigate('Weekend')
  };


  return (
    <View style={styles.container}>
      {/* All weekends */}
      {allWeekends.length > 0 && (
        <FlatList
          data={allWeekends.sort(sortByDate)}
          renderItem={({ item, index }) => (
            <View>
              {index === 0 || allWeekends[index - 1].status !== item.status ? (
                <View style={styles.sectionLabelContainer}>
                  <View style={styles.sectionSeparator} />
                  <Text style={styles.sectionLabelText}>
                    {item.status === 'coming' ? 'Coming' : 'Past'}
                  </Text>
                  <View style={styles.sectionSeparator} />
                </View>
              ) : null}
              <WeekendCard weekend={item} onPress={handleCardPress} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {/* Future weekends
        {futureWeekends.length > 0 && (
          <View>
            <Text>Coming</Text>
            <FlatList
              data={futureWeekends}
              renderItem={({ item }) => (
                <WeekendCard weekend={item} onPress={handleCardPress} />
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )} */}

      {/* Past weekends */}
      {/* {pastWeekends.length > 0 && (
          <View>
            <Text>Past</Text>
            <FlatList
              data={pastWeekends}
              renderItem={({ item }) => (
                <WeekendCard weekend={item} onPress={handleCardPress} />
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )} */}
      {/* weekends list
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
        ) : null} */}
    </View>
  );
};

export default WeekendsListScreen;