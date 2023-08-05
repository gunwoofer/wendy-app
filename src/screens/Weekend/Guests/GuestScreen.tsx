import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { styles } from './GuestScreenStyle';
import UserCard from '../../../components/UserCard/UserCard';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WeekendStackParamList } from '../WeekendScreen';
import { useStoreState, useStoreActions } from '../../../state/hooks';
import WeekendService from '../../../services/WeekendService';
import { Weekend } from '../../../models/weekend';

type GuestsScreenNavigationProp = StackNavigationProp<WeekendStackParamList, 'Guest'>;
type GuestsProps = {
    navigation: GuestsScreenNavigationProp;
    route: RouteProp<WeekendStackParamList, 'Guest'>;
};


const GuestsScreen = ({route, navigation}: GuestsProps) => {

  const weekendService = WeekendService.getInstance();
  const currentWeekend = useStoreState(state => state.currentWeekend);
  const setCurrentWeekend = useStoreActions((actions) => actions.setWeekend);

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    const updatedWeekend: Weekend = await weekendService.getWeekendByIdAPI(currentWeekend!.id);
    console.log("REFRESHED SUCCESSFULL : ", updatedWeekend);
    setCurrentWeekend(updatedWeekend);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guests</Text>
      <Text>{currentWeekend!.name}</Text>
      <FlatList
            data={currentWeekend!.participants}
            renderItem={({ item }) => (
              <UserCard user={item.email} />
            )}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
          />
      <Text>date: {currentWeekend!.date_debut}</Text>
      <Text>Sharing code: {currentWeekend!.sharing_code}</Text>
    </View>
  );
};

export default GuestsScreen;