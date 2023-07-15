import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { Weekend } from '../../models/weekend';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/userStack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons   } from '@expo/vector-icons';
import { styles } from './WeekendScreenStyle';

type WeekendScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Weekend'>;
type WeekendProps = {
    navigation: WeekendScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Weekend'>;
};

const WeekendScreen = ({route, navigation}: WeekendProps) => {

  return (
    <View style={styles.container}>
      <Text>{route.params.weekend.name}</Text>
      <Text>{route.params.weekend.participants}</Text>
      <Text>{route.params.weekend.date}</Text>
      {/* Display other details of the selected weekend */}
      {/* e.g., address, date, participants */}

      {/* Tabs */}
      <View style={styles.content}>
        {/* Weekend info */}
        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <Ionicons name="calendar-outline" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>General</Text>
        </TouchableOpacity>

        {/* Transport */}
        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <Ionicons name="car" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>Transport</Text>
        </TouchableOpacity>

        {/* Participants */}
        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <MaterialCommunityIcons name="account-group" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>Guests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeekendScreen;

