import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { styles } from './GuestScreenStyle';
import UserCard from '../../../components/UserCard/UserCard';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WeekendStackParamList } from '../WeekendScreen';

type GuestsScreenNavigationProp = StackNavigationProp<WeekendStackParamList, 'Guest'>;
type GuestsProps = {
    navigation: GuestsScreenNavigationProp;
    route: RouteProp<WeekendStackParamList, 'Guest'>;
};


const GuestsScreen = ({route, navigation}: GuestsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guests</Text>
      <Text>{route.params.weekend.name}</Text>
      <FlatList
            data={route.params.weekend.participants}
            renderItem={({ item }) => (
              <UserCard user={item} />
            )}
          />
      <Text>date de creation: {route.params.weekend.date}</Text>
      <Text>Sharing code: {route.params.weekend.sharing_code}</Text>
    </View>
  );
};

export default GuestsScreen;