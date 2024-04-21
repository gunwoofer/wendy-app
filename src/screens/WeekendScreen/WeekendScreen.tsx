import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { Weekend } from '../../models/weekend';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/userStack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import UserCard from '../../components/UserCard/UserCard';
import { FlatList } from 'react-native-gesture-handler';

type WeekendScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Weekend'>;
type WeekendProps = {
    navigation: WeekendScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Weekend'>;
};

const WeekendScreen = ({route, navigation}: WeekendProps) => {

  return (
    <View style={styles.container}>
      <Text>{route.params.weekend.name}</Text>
      <Text>date de creation: {route.params.weekend.date_debut}</Text>
      <Text>Sharing code: {route.params.weekend.sharing_code}</Text>

      {/* Display other details of the selected weekend */}
      {/* e.g., address, date, participants */}

      {/* Tabs */}
      <View style={styles.content}>
        {/* My Weekends Tab */}
        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <Ionicons name="calendar-outline" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>My Weekends</Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <Ionicons name="person-outline" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton]}
        >
          <Ionicons name="person-outline" size={24} color={'#000'} />
          <Text style={[styles.tabText, styles.activeTabText]}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeekendScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 40,
      paddingVertical: 8,
      backgroundColor: '#FFF',
      elevation: 2,
    },
    tabButton: {
      alignItems: 'center',
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
    },
    activeTabText: {
      color: '#007AFF',
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      alignSelf: 'center',
      backgroundColor: '#007AFF',
      borderRadius: 100,
      padding: 16,
      elevation: 4,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    responseContainer: {
        bottom: '30%'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    profileEmail: {
    fontSize: 16,
    marginBottom: 16,
    },
  });